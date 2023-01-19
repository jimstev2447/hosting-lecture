const db = require('../db/connection');

exports.fetchSnacks = (category_id = '*') => {
  const query = `
    SELECT * FROM snacks
    WHERE snacks.category_id=$1
    `;
  return db.query(query, [category_id]).then(({ rows }) => {
    return rows;
  });
};

exports.fetchCategoryById = (category_id) => {
  const query = `SELECT category_id FROM snack_categories
  WHERE snack_categories.category_id=$1
  `;
  return db.query(query, [category_id]).then(({ rowCount, rows }) => {
    if (rowCount === 0) {
      return Promise.reject({ status: 404, msg: 'category_id not found' });
    } else {
      return rows[0];
    }
  });
};
