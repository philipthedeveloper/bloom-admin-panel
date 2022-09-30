const ProductModel = require("../models/Product");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/error");

/**
 * @description GET ALL THE TASK
 * @function getAllProduct
 */
const getAllProducts = asyncWrapper(async (req, res) => {
  const allProduct = await ProductModel.find({});
  if (allProduct.length === 0)
    return res
      .status(200)
      .send({ data: [], msg: "No Product found in collection" });
  return res.status(200).json({ data: allProduct });
});

/**
 * @description CREATE A NEW TASK
 * @function createNewProduct
 */
const createNewProduct = async (req, res, next) => {
  const data = req.body;
  const { name, description, company, imgUrl } = req.body;
  let keyLength = 0;
  console.log(data);
  for (keys in data) {
    keyLength++;
  }

  if (keyLength === 0) {
    return next(
      createCustomError("Please provide all necessary information.", 400)
    );
  }

  if (!name || !company || !imgUrl || !description) {
    return next(
      createCustomError("Please provide all necessary information.", 400)
    );
  }

  const date = new Date().toUTCString();
  const price = Math.floor(Math.random() * 200);
  const newProduct = { ...data, createdAt: date, price };

  try {
    const productCreated = await ProductModel.create(newProduct);
    return res.status(201).redirect("/store");
  } catch (error) {
    if (error.code === 11000)
      return next(
        createCustomError(
          `Product with name ${newProduct.name} already exist....`,
          500
        )
      );

    return next(error);
  }
};

/**
 * @description GET A SINGLE TASK
 * @function getProduct
 */
const getProduct = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const singleProduct = await ProductModel.findOne({ _id: id });
  if (!singleProduct) {
    return next(createCustomError(`No Product with id: ${id}`, 404));
  }
  return res.json(singleProduct);
});

/**
 * @DESCRIPTION UPDATE A TASK
 * @function updateProduct
 */
const updateProduct = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: id },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  if (!updatedProduct) {
    return next(createCustomError(`No Product with id: ${id}`, 404));
  }
  return res.json({ data: updatedProduct, ok: true });
});

/**
 * @DESCRIPTION DELETE A TASK
 * @function deleteProduct
 */
const deleteProduct = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  const deletedProduct = await ProductModel.findOneAndDelete({ _id: id });
  if (!deletedProduct) {
    return next(createCustomError(`No Product with id: ${id}`, 404));
  }
  return res.json({ data: deletedProduct, ok: true });
});

module.exports = {
  getAllProducts,
  createNewProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
