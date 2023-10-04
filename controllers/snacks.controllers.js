const { fetchCategoryById } = require('../models/categories.models');
const {
  fetchSnacks,
  fetchSnackById,
  createSnack,
  updateSnack,
} = require('../models/snacks.models');

exports.getSnacks = (req, res, next) => {
  const { sortby, maxprice, category_id } = req.query;

  const promises = [fetchSnacks(sortby, maxprice, category_id)];
  if (category_id) promises.push(fetchCategoryById(category_id));

  Promise.all(promises)
    .then(([snacks]) => {
      res.status(200).send({ snacks });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getSnackById = (req, res, next) => {
  const { snack_id } = req.params;

  fetchSnackById(snack_id)
    .then((snack) => {
      res.status(200).send({ snack });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postSnack = (req, res, next) => {
  const { snack_name, price_in_pence, is_vegan } = req.body;

  createSnack(snack_name, price_in_pence, is_vegan).then((newSnack) => {
    res.status(201).send({ snack: newSnack });
  });
};

exports.patchSnack = (req, res, next) => {
  const { snack_id } = req.params;
  const { price_in_pence } = req.body;

  if (price_in_pence === undefined) {
    return next({ status: 400, message: 'price_in_pence is required' });
  }

  updateSnack(snack_id, price_in_pence)
    .then((snack) => {
      res.status(200).send({ snack });
    })
    .catch((err) => next(err));
};
