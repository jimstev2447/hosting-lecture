const { fetchSnacks, fetchCategoryById } = require('../models/models');

exports.getSnacks = (req, res, next) => {
  const { category_id } = req.query;

  Promise.all([
    fetchSnacks(category_id),
    category_id ? fetchCategoryById(category_id) : null,
  ])
    .then(([snacks]) => {
      res.status(200).send({ snacks });
    })
    .catch(next);
};
