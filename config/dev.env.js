'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    BASE_API: '"http://test.qr.joyxuan.com"',
    // BASE_API: '"http://192.168.1.23:9018"',
}