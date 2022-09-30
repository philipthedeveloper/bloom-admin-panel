const { CustomError } = require("../errors/error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ msg: err.message, status: err.statusCode });
  }
  return res.status(500).json({ msg: err });
};

module.exports = errorHandler;
