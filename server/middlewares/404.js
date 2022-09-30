const notFound = (req, res, next) => {
  res.status(404).send(`${req.url} Route does not exist.`);
  next();
};

module.exports = notFound;
