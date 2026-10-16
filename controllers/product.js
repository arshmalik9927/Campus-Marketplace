import Product from "../models/product.js";

// Show all products
export const index = async (req, res) => {

    const allProduct = await Product.find({})
        .populate("seller");

    res.render("products/index", {
        allProduct,
        title: "CampusMarket — Buy, sell, connect"
    });
};


// Render new product form
export const renderNewForm = (req, res) => {
    res.render("products/new");
};


// Show single product
export const showProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("seller");

    if (!product) {
        req.flash(
            "error",
            "Product you requested does not exist!"
        );

        return res.redirect("/products");
    }

    res.render("products/show", {
        product
    });
};


// Create product
export const createProduct = async (req, res) => {
    const { path: url, filename } = req.file;

    const newProduct = new Product(req.body.product);

    // Save logged-in seller as product owner
    newProduct.seller = req.user._id;

    newProduct.image = {
        url,
        filename
    };

    await newProduct.save();

    req.flash(
        "success",
        "New product created successfully!"
    );

    res.redirect("/products");
};


// Render edit form
export const editProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        req.flash(
            "error",
            "Product you requested does not exist!"
        );

        return res.redirect("/products");
    }

    let originalImageUrl = product.image?.url;

    if (originalImageUrl) {
        originalImageUrl = originalImageUrl.replace(
            "/upload",
            "/upload/w_250"
        );
    }

    res.render("products/edit", {
        product,
        originalImageUrl
    });
};


// Update product
export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
        id,
        req.body.product,
        {
            runValidators: true,
            new: true
        }
    );

    if (!product) {
        req.flash(
            "error",
            "Product not found!"
        );

        return res.redirect("/products");
    }

    // Update image only if a new image was uploaded
    if (req.file) {
        const { path: url, filename } = req.file;

        product.image = {
            url,
            filename
        };

        await product.save();
    }

    req.flash(
        "success",
        "Product updated successfully!"
    );

    res.redirect(`/products/${id}`);
};


// Delete product
export const destroyProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        req.flash(
            "error",
            "Product not found!"
        );

        return res.redirect("/products");
    }

    req.flash(
        "success",
        "Product deleted successfully!"
    );

    res.redirect("/products");
};


// Search products
export const searchProduct = async (req, res) => {
    const { search } = req.query;

    if (!search || search.trim() === "") {
        return res.redirect("/products");
    }

    const allProduct = await Product.find({
        $or: [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                category: {
                    $regex: search,
                    $options: "i"
                }
            }
        ]
    });

    res.render("products/index", {
        allProduct,
        search,
        title: "Search — CampusMarket"
    });
};


// Filter products by category
export const filterByCategory = async (req, res) => {
    const { category } = req.params;

    const allProduct = await Product.find({
        category
    });

    res.render("products/index", {
        allProduct
    });
};