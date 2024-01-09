const pg = require('pg');

const pool = new pg.Pool({

  database: 'koalas',
  host: 'localhost',
  port: '5432',
});

module.exports = pool;