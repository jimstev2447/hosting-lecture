const { Pool } = require('pg');

if (process.env.PGDATABASE === undefined) {
  throw new Error('no PGDATABSE set');
}

const connection = new Pool({
  database: process.env.PGDATABASE,
});

module.exports = connection;
