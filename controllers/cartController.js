const Cart = require("../models/Cart");
const Product = require("../models/Product");

//CREATE a cart
exports.addCart = async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found!");
    }
    const price = item.price;

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ productId, quantity, price, product: item });
      }
      cart.subPrice += quantity * price;
      cart = await cart.save();
      return res.status(201).json(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, price, product: item }],
        subPrice: quantity * price,
      });
      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

//DELETE cart item
exports.deleteCartItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = myIndexOf(cart.products, productId);

    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      cart.subPrice -= productItem.quantity * productItem.price;
      cart.products.splice(itemIndex, 1);
    }
    updatedCart = await cart.save();
    return res.status(201).json(updatedCart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

// Delete all items in the cart
exports.deleteCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    let cart = await Cart.findOne({ userId });
    let length = cart.products.length;

    cart.subPrice = 0;
    cart.products.splice(0, length);
    updatedCart = await cart.save();
    return res.status(201).json(updatedCart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

// Delete user cart
// exports.deleteCart = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     let cart = await Cart.findOne({ userId });
//     await Cart.findByIdAndDelete({ _id: cart._id });
//     res.status(200).json("Cart has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

//GET user cart
exports.getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const { quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = myIndexOf(cart.products, productId);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      cart.subPrice -= productItem.quantity * productItem.price;
      productItem.quantity = quantity;
      cart.subPrice += productItem.quantity * productItem.price;
    }
    updatedCart = await cart.save();
    return res.status(201).json(updatedCart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

function myIndexOf(collection, target) {
  if (!collection) return -1;
  else {
    for (var val = 0; val < collection.length; val++) {
      if (
        collection[val]._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") ===
        target
      ) {
        return val;
      }
    }
  }
  // return -1;
}
