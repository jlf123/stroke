const { join } = require('path');
const webpack = require('webpack');
const electronConfig = require('./app/config/electron.config');
const splashScreenConfig = require('./app/config/splash-screen.config');

module.exports = [splashScreenConfig, electronConfig];
