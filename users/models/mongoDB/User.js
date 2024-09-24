const mongoose = require("mongoose");
const { PHONE, EMAIL } = require("../../../helpers/mongoDB/mongooseValidators");
const { Image } = require("../../../helpers/mongoDB/Image");
const { Address } = require("../../../helpers/mongoDB/Address");
const { Name } = require("../../../helpers/mongoDB/Name");


const userSchema = new mongoose.Schema({
    name: Name,
    phone: PHONE,
    email: EMAIL,
    password: {
        type: String,
        required: true,
        trim: true,
    },
    image: Image,
    address: Address,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("user", userSchema);


module.exports = { User };