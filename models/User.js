import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    }

});

// IMPORTANT
const plugin = passportLocalMongoose.default || passportLocalMongoose;

userSchema.plugin(plugin);

const User = mongoose.model("User", userSchema);

export default User;