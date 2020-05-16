const packageJson = require('../package.json')
const sevenBin = require('7zip-bin')
const seven = require('node-7z')
const path = require('path')

const pathTo7zip = sevenBin.path7za

const zipApp = () => {
    const version = packageJson.version

    const stream = seven.add(
        path.join(__dirname, `../stroke-${version}-mac.zip`),
        path.join(__dirname, '../dist/mac/stroke.app'),
        {
            $bin: pathTo7zip,
            recursive: true,
            $progress: true
        }
    )

    stream.on('progress', function (progress) {
        if (progress.percent % 5 === 0) {
            console.log(`compression: ${progress.percent}/100`)
        }
    })
}

zipApp()
