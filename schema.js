import Joi from "joi";

// Product Validation
export const productSchema = Joi.object({
    product: Joi.object({
        title: Joi.string().required(),

        description: Joi.string().required(),

        price: Joi.number()
            .min(0)
            .required(),

        category: Joi.string()
            .valid(
                "Notes",
                "Books",
                "Calculators",
                "Laptops",
                "Accessories"
            )
            .required(),

        image: Joi.string()
            .allow("", null)
    }).required()
});

// Review Validation
export const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number()
            .required()
            .min(1)
            .max(5),

        comment: Joi.string()
            .required()
    }).required()
});

