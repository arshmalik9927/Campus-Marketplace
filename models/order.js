import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                title: {
                    type: String,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Completed",
                "Cancelled"
            ],
            default: "Pending"
        },

        deliveryAddress: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;