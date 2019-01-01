/* eslint no-console: "off", global-require: off, no-multi-assign: off */

const portfinder = require('portfinder-sync');
const path = require('path');
const convict = require('convict');
const chalk = require('chalk');

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['development', 'staging', 'testing', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  api: {
    doc: 'API Endpoint URL',
    default: 'http://localhost:3002',
    format: 'url',
    env: 'API_ENDPOINT',
    arg: 'api',
  },
  inject: {
    doc: 'Object of properties to be injected into window',
    format: Object,
    default: {
      NODE_ENV: process.env.NODE_ENV || 'development'
    },
  },
  test: {
    url: {
      doc: 'URL (excluding port) that tests should be ran against',
      default: `http://localhost:${portfinder.getPort(8585)}`,
      format: 'url',
      env: 'TEST_URL',
      arg: 'test-url',
    },
  },
});

config.set('test.port', config.default('test.url').split(':')[2]);

// Load environment configuration files
const localConfig = path.join(__dirname, 'local.json');

try {
  config.loadFile(localConfig);
} catch (error) {
  console.warn(`${chalk.bgRed.dim.black('Warning:')} Skipping missing configuration file: ${localConfig}`);
}

console.log('\nCurrent Configuration:', `
  Build Environment: ${config.get('env')}
  API Endpoint: ${config.get('api')}
  Test URL: ${config.get('test.url')}
\n`);

config.validate();

module.exports = config;
