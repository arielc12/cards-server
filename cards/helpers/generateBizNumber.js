const _ = require("lodash");
const { Card } = require("../models/mongoDB/Card");
const { createError } = require("../../utils/handleErrors");
const generateBizNumber = async () => {
    let cardsCount = await Card.countDocuments();
    if (cardsCount === 9_000_000) {
        return createError("Mongoose", 409, new Error("You reached to the maximum cards count in your system"));
    }
    let random;
    do {
        random = _.random(1_000_000, 9_999_9999);
    } while (await isBizNumberExists(random));
    return random;
};
const isBizNumberExists = async (bizNumber) => {
    try {
        const cardWithThisBizNumber = await Card.findOne({ bizNumber });
        return Boolean(cardWithThisBizNumber);
    } catch (error) {
        return createError("Mongoose", 500, error);
    }
};
module.exports = { generateBizNumber, isBizNumberExists };