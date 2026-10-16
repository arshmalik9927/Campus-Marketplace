import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import productRouter from "./routes/products.js";
import reviewsRouter from "./routes/reviews.js";
import userRouter from "./routes/users.js";
import ejsMate from "ejs-mate";

import ExpressError from "./utils/ExpressError.js";
import User from "./models/User.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/orders.js";


const app = express();




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Middleware


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// Mongodb

const dburl = "mongodb://127.0.0.1:27017/campus_marketplace";

mongoose
    .connect(dburl)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });




const store = MongoStore.create({
    mongoUrl: dburl,
    touchAfter: 24 * 3600
});

store.on("error", (err) => {
    console.log("ERROR in Mongo Store:", err);
});



// Session


const sessionOptions = {
    store,

    secret: "ajsdgjadahdah",

    resave: false,

    saveUninitialized: false,

    cookie: {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),

        maxAge: 7 * 24 * 60 * 60 * 1000,

        httpOnly: true
    }
};

app.use(session(sessionOptions));



app.use(flash());

// Passport


app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());



// Global Variables


app.use((req, res, next) => {

    res.locals.success = req.flash("success");

    res.locals.error = req.flash("error");

    res.locals.currUser = req.user;

    next();
});



// Routes


app.use("/products", productRouter);

app.use(
    "/products/:id/reviews",
    reviewsRouter
);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/", userRouter);


// 404 Handler


app.use((req, res, next) => {

    next(
        new ExpressError(
            404,
            "Page Not Found"
        )
    );
});



// Error Handler


app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong.";

    res.status(statusCode).render("error", {
        statusCode,
        message
    });

});




app.listen(8080, () => {

    console.log(
        "Server is running on http://localhost:8080"
    );

});

