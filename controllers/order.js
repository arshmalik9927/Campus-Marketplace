import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/product.js";


// =========================
// CHECKOUT PAGE
// =========================

export const renderCheckout = async (req, res) => {

    const cart = await Cart.findOne({
        user: req.user._id
    }).populate("items.product");

    // Cart doesn't exist
    if (!cart || cart.items.length === 0) {
        req.flash("error", "Your cart is empty!");
        return res.redirect("/cart");
    }

    // Remove products which no longer exist
    cart.items = cart.items.filter(
        item => item.product
    );

    if (cart.items.length === 0) {
        await cart.save();

        req.flash(
            "error",
            "The products in your cart are no longer available."
        );

        return res.redirect("/cart");
    }

    // Calculate total
    const total = cart.items.reduce(
        (sum, item) =>
            sum + (item.product.price * item.quantity),
        0
    );

    res.render("orders/checkout", {
        cart,
        total,
        title: "Checkout — CampusMarket"
    });
};


// =========================
// CREATE ORDER
// =========================

export const createOrder = async (req, res) => {

    const { deliveryAddress } = req.body;

    // Validate address
    if (!deliveryAddress || deliveryAddress.trim() === "") {

        req.flash(
            "error",
            "Please enter your delivery address."
        );

        return res.redirect("/orders/checkout");
    }


    const cart = await Cart.findOne({
        user: req.user._id
    }).populate("items.product");


    // Empty cart
    if (!cart || cart.items.length === 0) {

        req.flash(
            "error",
            "Your cart is empty!"
        );

        return res.redirect("/cart");
    }


    // Remove unavailable products
    const validItems = cart.items.filter(
        item => item.product
    );


    if (validItems.length === 0) {

        await Cart.findOneAndDelete({
            user: req.user._id
        });

        req.flash(
            "error",
            "The products in your cart are no longer available."
        );

        return res.redirect("/cart");
    }


    // Create order items
    const orderItems = validItems.map(item => ({

        product: item.product._id,

        title: item.product.title,

        price: item.product.price,

        quantity: item.quantity

    }));


    // Calculate total
    const totalAmount = orderItems.reduce(
        (sum, item) =>
            sum + (item.price * item.quantity),
        0
    );


    // Create order
    const newOrder = new Order({

        buyer: req.user._id,

        items: orderItems,

        totalAmount,

        deliveryAddress: deliveryAddress.trim(),

        status: "Pending"

    });


    await newOrder.save();


    // Clear cart
    await Cart.findOneAndDelete({
        user: req.user._id
    });


    req.flash(
        "success",
        "Your order has been placed successfully!"
    );


    res.redirect(`/orders/${newOrder._id}`);
};


// =========================
// SHOW ORDER
// =========================

export const showOrder = async (req, res) => {

    const { id } = req.params;


    const order = await Order.findOne({

        _id: id,

        buyer: req.user._id

    }).populate("buyer");


    if (!order) {

        req.flash(
            "error",
            "Order not found!"
        );

        return res.redirect("/orders");
    }


    res.render("orders/show", {

        order,

        title: "Order Details — CampusMarket"

    });
};


// =========================
// MY ORDERS
// =========================

export const showMyOrders = async (req, res) => {

    const orders = await Order.find({

        buyer: req.user._id

    })
        .sort({ createdAt: -1 });


    res.render("orders/index", {

        orders,

        title: "My Orders — CampusMarket"

    });
};

export const showSellerOrders = async (req, res) => {

    // Seller ke products find karo
    const sellerProducts = await Product.find({
        seller: req.user._id
    }).select("_id");

    const productIds = sellerProducts.map(
        product => product._id
    );

    // Seller ke products wale orders find karo
    const orders = await Order.find({
        "items.product": { $in: productIds }
    })
        .populate("buyer")
        .sort({ createdAt: -1 });

    // Sirf seller ke products order items mein rakho
    const sellerOrders = orders.map(order => {

        const sellerItems = order.items.filter(item =>
            productIds.some(productId =>
                productId.equals(item.product)
            )
        );

        return {
            ...order.toObject(),
            items: sellerItems
        };
    });

    res.render("orders/seller", {
        orders: sellerOrders,
        title: "Seller Orders — CampusMarket"
    });
};

// =========================
// UPDATE ORDER STATUS
// =========================

export const updateOrderStatus = async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
    ];

    // Validate status
    if (!allowedStatuses.includes(status)) {

        req.flash(
            "error",
            "Invalid order status!"
        );

        return res.redirect("/orders/seller");
    }


    // Find order
    const order = await Order.findById(id);

    if (!order) {

        req.flash(
            "error",
            "Order not found!"
        );

        return res.redirect("/orders/seller");
    }


    // Find seller's products
    const sellerProducts = await Product.find({
        seller: req.user._id
    }).select("_id");


    const productIds = sellerProducts.map(
        product => product._id.toString()
    );


    // Check whether this order contains seller's product
    const hasSellerProduct = order.items.some(item =>
        productIds.includes(item.product.toString())
    );


    if (!hasSellerProduct) {

        req.flash(
            "error",
            "You cannot update this order."
        );

        return res.redirect("/orders/seller");
    }


    // Update status
    order.status = status;

    await order.save();


    req.flash(
        "success",
        `Order status updated to ${status}.`
    );


    res.redirect("/orders/seller");
};