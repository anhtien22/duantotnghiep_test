import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc Place new order
// @route POST '/api/orders/new'
// @access Private : User/Admin
export const placeOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, user: req.user._id })
    await order.save()
    res.status(201).json({ success: true, message: 'Đã đặt hàng', order })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc Get all orders
// @route GET '/api/orders/all'
// @access Private : Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort("-createdAt")
      .populate("user", "name email");
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc Get my orders
// @route GET '/api/orders/myOrders'
// @access Private : User
export const getMyOrders = async (req, res) => {
  try {
    const myOrders = await Order.find({ user: req.user._id })
      .sort("-createdAt")
      .populate("user", "name email");
    res.status(200).json({ success: true, myOrders });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc Get One order by id
// @route GET '/api/orders/myOrders/:id'
// @access Private : User
export const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("user", "name email");
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: 'Không thể tìm thấy đơn đặt hàng!' })
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc Get One order by id admin
// @route GET '/api/orders/:id'
// @access Private : Admin
export const getOneOrderAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: 'Không thể tìm thấy đơn đặt hàng!' })
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, error: "Order not found with this Id" });
  }
  if (order.paymentResult.status === "Successfully") {
    return res.status(400).json({
      success: false,
      error: "You have already Successfully this order",
    });
  }
  // order.orderItems.forEach(async (o) => {
  //   await updateStock(o.product, o.quantity);
  // });
  order.paymentResult.status = req.body.status;

  if (req.body.status === "Successfully") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    status: order.paymentResult.status,
  });
};
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}
