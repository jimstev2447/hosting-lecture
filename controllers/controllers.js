const { fetchSnacks, fetchCategoryById } = require('../models.js');

exports.getSnacks = (req, res, next) => {
  const { category_id } = req.query;

  Promise.all([fetchSnacks(category_id), fetchCategoryById(category_id)])
    .then(([snacks]) => {
      res.status(200).send({ snacks });
    })
    .catch(next);
};
