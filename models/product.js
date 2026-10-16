import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    image: {
        url: String,
        filename: String
    },

    category: {
        type: String,
        enum: [
            "Notes",
            "Books",
            "Calculators",
            "Laptops",
            "Accessories"
        ],
        required: true
    },

    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

const Product = mongoose.model("Product", productSchema);

export default Product;