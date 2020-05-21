#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const yml = require('js-yaml')
const github = require('octonode')
const client = github.client(process.env.GH_TOKEN)
const path = require('path')
const packageJson = require('../package.json')
const assetUploader = require('gh-release-assets')
const STROKE_RELEASE = packageJson.version

const exportBlockMapData = () => {
    const blockMapData = JSON.parse(
        execSync(
            /* eslint-disable-next-line no-undef */
            `./node_modules/app-builder-bin/mac/app-builder blockmap -i ./stroke-${STROKE_RELEASE}-mac.zip -o ./throwaway.zip`
        ).toString()
    )
    console.log('got the block data', blockMapData)
    return blockMapData
}

const updateLatestYaml = ({ sha512, size }) => {
    let latestYml = yml.safeLoad(
        fs.readFileSync(path.join(__dirname, '../dist/latest-mac.yml'), 'utf8')
    )

    latestYml.files[0] = {
        ...latestYml.files[0],
        size,
        sha512
    }

    latestYml.sha512 = sha512

    fs.writeFile(
        path.join(__dirname, '../latest-mac.yml'),
        yml.safeDump(latestYml),
        (error) => {
            if (error) {
                console.error('unable to re-write latest.yml', error)
            } else {
                console.log('successfully re-wrote latest.yml')
            }
        }
    )
}

const execute = async () => {
    return new Promise((resolve, reject) => {
        try {
            updateLatestYaml(exportBlockMapData())
        } catch (error) {
            console.error(
                'Unable to update latest.yml file, stopping script',
                error
            )
            reject(error.message)
            return
        }

        client.get(
            '/repos/jlf123/stroke/releases',
            (error, status, releases) => {
                if (error) {
                    console.error('unable to get the releases', error)
                }

                const releaseToUpdate = releases.find(
                    /* eslint-disable-next-line no-undef */
                    ({ name }) => {
                        console.log(name)
                        return name === STROKE_RELEASE
                    }
                )

                if (!releaseToUpdate) {
                    console.log(
                        `Couldn't find a release, please create one first`
                    )
                    resolve()
                    return
                }

                console.log('found the release', releaseToUpdate.id)

                // load the files that we want to update
                const appZipName = `stroke-${STROKE_RELEASE}-mac.zip`

                assetUploader(
                    {
                        url: releaseToUpdate.upload_url,
                        token: [process.env.GH_TOKEN],
                        assets: [
                            path.join(__dirname, '../latest-mac.yml'),
                            path.join(__dirname, '..', appZipName)
                        ]
                    },
                    (error, assets) => {
                        console.log('successfully uploaded assets', assets)
                        if (error) {
                            console.error(
                                'unable to upload assets to github',
                                error
                            )
                            reject(error)
                            return
                        }

                        resolve()
                    }
                )
            }
        )
    })
}

setTimeout(() => execute(), 1000)
