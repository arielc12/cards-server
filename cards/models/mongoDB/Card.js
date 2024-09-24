const mongoose = require("mongoose");
const { PHONE, EMAIL, URL, DEFAULT_VALIDATION } = require("../../../helpers/mongoDB/mongooseValidators");
const { Image } = require("../../../helpers/mongoDB/Image");
const { Address } = require("../../../helpers/mongoDB/Address");


const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024,
    },
    phone: PHONE,
    email: EMAIL,
    web: URL,
    image: Image,
    address: Address,
    bizNumber: {
        type: Number,
        required: true,
        min: 10000000,
        max: 99999999,
    },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Card = mongoose.model("card", cardSchema);

module.exports = { Card };