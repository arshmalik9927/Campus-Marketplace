import mongoose from "mongoose";
import Product from "../models/product.js";
import User from "../models/User.js";
import sampleProducts from "./data.js";

const dburl = "mongodb://127.0.0.1:27017/campus_marketplace";

const initDB = async () => {
    try {
        // Connect MongoDB
        await mongoose.connect(dburl);

        console.log("MongoDB connected!");

        // Remove old products
        await Product.deleteMany({});

        // Find existing seller
        let seller = await User.findOne({
            username: "campusSeller"
        });

        // Create seller if not exists
        if (!seller) {
            const newUser = new User({
                username: "campusSeller",
                email: "seller@campusmarket.com",
                role: "seller"
            });

            seller = await User.register(
                newUser,
                "Seller@123"
            );

            console.log("Seller user created!");
        }

        // Add seller ID to every product
        const productsWithSeller = sampleProducts.map(
            (product) => ({
                ...product,
                seller: seller._id
            })
        );

        // Insert products
        await Product.insertMany(productsWithSeller);

        console.log(
            `${productsWithSeller.length} products inserted successfully!`
        );

        console.log("Seller Login:");
        console.log("Username: campusSeller");
        console.log("Password: Seller@123");

    } catch (error) {
        console.log("Database initialization error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
};

initDB();