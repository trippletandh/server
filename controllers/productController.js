const Product = require("../models/Product");

// exports.getAllProduct = async (req, res) => {
//   const page = +req.query.page || 1;
//   const category = req.query.category || "all";
//   const totalItems =
//     category === "all"
//       ? await Product.find().countDocuments()
//       : await Product.find({ category: category }).countDocuments();

//   const products =
//     category === "all"
//       ? await Product.find()
//           .skip((page - 1) * ITEMS_PER_PAGE)
//           .limit(ITEMS_PER_PAGE)
//       : await Product.find({ category: category })
//           .skip((page - 1) * ITEMS_PER_PAGE)
//           .limit(ITEMS_PER_PAGE);
//   // const totalItems = products.length;
//   console.log(totalItems);
//   res.json({
//     products: products,
//     page: page,
//     skip: (page - 1) * ITEMS_PER_PAGE,
//     limit: ITEMS_PER_PAGE,
//     total: 100,
//     currentPage: page,
//     hasNextPage: ITEMS_PER_PAGE * page < totalItems,
//     hasPreviousPage: page > 1,
//     nextPage: page + 1,
//     previousPage: page - 1,
//     lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
//   });
// };

// GET all products
exports.getAllProduct = async (req, res) => {
  const products = await Product.find(req.query);
  res.json(products);
};

// GET product by id
exports.getProductById = async (req, res) => {
  const selectedItem = await Product.findById(req.params.productId);
  if (!selectedItem)
    res.json({
      message: `Product with id '${req.params.productId}' not found`,
    });
  res.json(selectedItem);
};

// Search product
exports.searchProduct = async (req, res) => {
  const products = await Product.find({
    title: { $regex: req.query.q, $options: "i" },
  });
  res.json({
    products: products,
  });
};

// CREATE a new product
exports.addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

// UPDATE a product by ID
exports.updateProduct = async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  res.json(updateProduct);
};

// DELETE product by ID
exports.deleteProduct = async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete({
    id: req.params.productId,
  });
  res.json(deletedProduct);
};
