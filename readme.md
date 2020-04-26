### Best readme in the world

1. yarn install
2. yarn start

### Generate a distributable package

```$ yarn dist```

### Deploying a release
* Make sure you have the APPLEID and APPLIDEPASS environment variables set in env.sh. This is needed to notarize the app. This was super helpful: https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/
* source your environment variables with `source env.sh`
* run `yarn release`
* set the version by running `export STROKE_RELEASE=${new-version}`
* run `yarn zip:app`
* run `yarn upload:zip`