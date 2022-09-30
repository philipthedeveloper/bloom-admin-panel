const reqDet = (req, res, next) => {
  const reqDetials = {
    METHOD: req.method,
    URL: req.url,
    TIME: new Date().toUTCString(),
  };
  console.log(reqDetials);
  next();
};

module.exports = reqDet;
