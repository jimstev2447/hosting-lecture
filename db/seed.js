const db = require('./connection');
const format = require('pg-format');
const snacks = require('./data/snacks.js');
const catagories = require('./data/catagories.js');
const { formatSnack } = require('./utils');

function seed() {
  return db
    .query(`DROP TABLE IF EXISTS snacks;`)
    .then(() => {
      return db.query('DROP TABLE IF EXISTS snack_categories;');
    })
    .then(() => {
      return db.query(`
    CREATE TABLE snack_categories
    ( category_id SERIAL PRIMARY KEY, 
      category_name VARCHAR(40),
      category_description TEXT);
      `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE snacks
(
  snack_id SERIAL PRIMARY KEY,
  snack_name VARCHAR(30),
  price INT,
  snack_description TEXT,
  category_id INT REFERENCES snack_categories(category_id)
);
      `);
    })
    .then(() => {
      const catagoriesData = catagories.map((category) => {
        return [category.category_name, category.description];
      });

      const sqlString = format(
        `
      INSERT INTO snack_categories
      (category_name, category_description)
      VALUES
      %L
      RETURNING *;
      `,
        catagoriesData
      );
      return db.query(sqlString);
    })
    .then((result) => {
      const categories = result.rows;
      const formattedSnacks = snacks.map((snack) => {
        return formatSnack(snack, categories);
      });

      const queryStr = format(
        `
      INSERT INTO snacks
  (snack_name, price, snack_description, category_id)
VALUES %L`,
        formattedSnacks
      );

      return db.query(queryStr);
    });
}

module.exports = { seed };
