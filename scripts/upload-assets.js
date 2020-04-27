#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const yml = require('js-yaml')
const github = require('octonode')
const client = github.client()
const path = require('path')

const exportBlockMapData = () => {
    const blockMapData = JSON.parse(
        execSync(
            /* eslint-disable-next-line no-undef */
            `./node_modules/app-builder-bin/mac/app-builder blockmap -i ./stroke-${process.env.STROKE_RELEASE}-mac.zip -o ./throwaway.zip`
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
                console.log(error)
            }
        }
    )
}

const execute = async () => {
    return new Promise((resolve) => {
        updateLatestYaml(exportBlockMapData())
        client.get(
            '/repos/jlf123/stroke/releases',
            (error, status, releases) => {
                const releaseToUpdate = releases.find(
                    /* eslint-disable-next-line no-undef */
                    ({ name }) => {
                        console.log(name)
                        return name === process.env.STROKE_RELEASE
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
                const appZipName = `stroke-${process.env.STROKE_RELEASE}-mac.zip`
                const latestYml = fs.readFileSync(
                    path.join(__dirname, '../latest-mac.yml')
                )
                const appZip = fs.readFileSync(
                    path.join(__dirname, '..', appZipName)
                )
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
                    }
                )
            }
        )
    })
}

execute()
