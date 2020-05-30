#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const yml = require('js-yaml')
const github = require('octonode')
const client = github.client(process.env.GH_TOKEN)
const path = require('path')
const packageJson = require('../package.json')
const STROKE_RELEASE = packageJson.version
const upload = require('./upload')

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

    try {
        fs.writeFileSync(
            path.join(__dirname, '../latest-mac.yml'),
            yml.safeDump(latestYml)
        )
        console.log('successfully re-wrote latest.yml')
    } catch (error) {
        console.error('unable to re-write latest.yml', error)
    }
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
            async (error, status, releases) => {
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

                await upload({
                    url: releaseToUpdate.upload_url.replace(
                        /({\?name,label})$/,
                        ''
                    ),
                    token: process.env.GH_TOKEN,
                    version: STROKE_RELEASE,
                    assets: [
                        {
                            path: path.join(__dirname, '../latest-mac.yml'),
                            name: 'latest-mac.yml',
                            type: 'application/x-yaml',
                            assetUrl: releaseToUpdate.assets.find(
                                (asset) => asset.name === 'latest-mac.yml'
                            ).url
                        },
                        {
                            path: path.join(__dirname, '..', appZipName),
                            name: appZipName,
                            type: 'application/zip',
                            assetUrl: releaseToUpdate.assets.find(
                                (asset) => asset.name === appZipName
                            ).url
                        }
                    ]
                })
            }
        )
    })
}

setTimeout(() => execute(), 1500)
