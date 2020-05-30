const fs = require('fs')
const package_ = require('../package.json')
const axios = require('axios')

const upload = async ({ url, token, version, assets }) => {
    await Promise.all(
        assets.map(async ({ path, name, type, assetUrl }) => {
            const stat = fs.statSync(path)
            const fileStream = fs.createReadStream(path)

            try {
                // let's delete existing asset FIRST, because github doesn't
                // allow you to update an asset

                await axios({
                    method: 'DELETE',
                    url: assetUrl,
                    headers: {
                        Authorization: `token ${token}`
                    }
                })

                console.log(`successfully deleted asset using ${assetUrl}`)

                await axios({
                    method: 'POST',
                    url: url,
                    data: fileStream,
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity,
                    headers: {
                        'Content-Type': type,
                        Authorization: `token ${token}`,
                        'Content-Length': stat.size
                    },
                    params: {
                        name
                    }
                })

                console.log(`successfully uploaded ${name}`)
                return
            } catch (error) {
                console.error('unable to upload file', error)
                return
            }
        })
    )
}

module.exports = upload
