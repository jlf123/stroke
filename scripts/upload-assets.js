#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const yml = require('js-yaml')
const github = require('octonode')
const client = github.client(process.env.GH_TOKEN)
const path = require('path')
const packageJson = require('../package.json')

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

const readFilesToUpdate = (appZipName) => {
    try {
        const latestYml = fs.readFileSync(
            path.join(__dirname, '../latest-mac.yml')
        )
        const appZip = fs.readFileSync(path.join(__dirname, '..', appZipName))

        return {
            latestYml,
            appZip
        }
    } catch (error) {
        console.error('Unable to open files', error)
        return {}
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
            reject(error.message);
            return;
        }

        client.get(
            '/repos/jlf123/stroke/releases',
            (error, status, releases) => {
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

                const { latestYml, appZip } = readFilesToUpdate(appZipName)

                if (!latestYml && !appZip) {
                    console.log('Unexpected error, stopping script')
                    return
                }

                console.log('loaded latest.yml and app files')

                client.post(
                    `/repos/jlf123/stroke/releases/${releaseToUpdate.id}/assets`,
                    {
                        query: { name: 'latest-mac.yml' },
                        body: latestYml,
                        headers: { 'Content-Type': 'application/x-yaml' }
                    },
                    (error, status, body) => {
                        if (!error) {
                            console.log('uploaded the latest-mac.yml file')
                        }

                        if (error) {
                            console.error(
                                'unable to upload latest-mac.yml file',
                                error
                            )
                        }
                    }
                )

                client.post(
                    /* eslint-disable-next-line no-undef */
                    `/repos/jlf123/stroke/releases/${releaseToUpdate.id}/assets`,
                    {
                        query: { name: appZipName },
                        body: appZip,
                        headers: { 'Content-Type': 'application/zip' }
                    },

                    (error, status, body) => {
                        if (!error) {
                            console.log('successfully loaded the app.zip file')

                            // this file will take longer to update so we'll end the process
                            // after this is done.
                            resolve()
                        }

                        if (error) {
                            console.error(
                                'unable to upload app.zip file',
                                error
                            )
                            reject(error)
                        }
                    }
                )
            }
        )
    })
}

execute()
