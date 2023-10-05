exports.getWelcomeMessage = (req, res) => {
  res.status(200).send({ message: 'hello peeps!!!' });
};
