const ENV = process.env.NODE_ENV || 'development';

const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;
require('dotenv').config({
  path: pathToCorrectEnvFile,
});
const { Pool } = require('pg');

if (
  process.env.PGDATABASE === undefined &&
  process.env.DATABASE_URL === undefined
) {
  throw new Error('no PGDATABSE or URL set');
}

const config =
  ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 2,
      }
    : {};

const connection = new Pool(config);

module.exports = connection;
