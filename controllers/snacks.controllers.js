const {
  fetchSnacks,
  fetchSnackById,
  createSnack,
} = require("../models/snacks.models");

exports.getSnacks = (req, res, next) => {
  const { sortby, maxprice } = req.query;

  fetchSnacks(sortby, maxprice)
    .then((snacks) => {
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
