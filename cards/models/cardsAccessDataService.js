const { Card } = require("./mongoDB/Card");
const { createError } = require("../../utils/handleErrors");
const config = require("config");
const db = config.get("DB");

const getCards = async () => {
    if (db === "mongodb") {
        try {
            let cards = await Card.find();
            return cards;
        } catch (error) {
            return createError("Mongoose", 400, error);
        }
    }
    return createError("DB", 500, new Error("there is no other db for this requests"));
};

const getCard = async (cardId) => {
    if (db === "mongodb") {
        try {
            let card = await Card.findById(cardId);
            return card;
        } catch (error) {
            return createError("Mongoose", 400, error);
        }
    }
    return createError("DB", 500, new Error("there is no other db for this requests"));
};

const getMyCards = async (userId) => {
    if (db === "mongodb") {
        try {
            let cards = await Card.find({ user_id: userId });
            return cards;
        } catch (error) {
            return createError("Mongoose", 400, error);
        }
    }
    return createError("DB", 500, new Error("there is no other db for this requests"));
};

const createCard = async (newCard) => {
    if (db === "mongodb") {
        try {
            let card = new Card(newCard);
            card = await card.save();
            return card;
        } catch (error) {
            return createError("Mongoose", 400, error);
        }
    }
    return createError("DB", 500, new Error("there is no other db for this requests"));
};

const updateCard = async (cardId, newCard) => {
    if (db === "mongodb") {
        try {
            let card = await Card.findByIdAndUpdate(
                cardId,
                newCard,
                { new: true }
            );
            if (!card) {
                return createError("Mongoose", 404, new Error("Card not found or unauthorized"));
            }
            return card;
        } catch (error) {
            return createError("Mongoose", error.status || 400, error);
        }
    }
    return createError("DB", 500, new Error("there is no other db for this requests"));
};

const likeCard = async (userId, cardId) => {
    if (db === "mongodb") {
        try {
            let card = await Card.findById(cardId);
            if (!card) {
                return createError("Mongoose", 404, new Error("Card not found"));
            }
            const index = card.likes.indexOf(userId);
            if (index === -1) {
                card.likes.push(userId);
            } else {
                card.likes.splice(index, 1);
            }
            await card.save();
            return card;
        } catch (error) {
            return createError("Mongoose", error.status || 400, error);
        }
    }
    return createError("DB", 500, new Error("there is no other db for this requests"));
};

const changeBizNumber = async (userId, newBizNumber) => {
    if (db === "mongodb") {
        try {
            let result = await Card.updateMany(
                { user_id: userId },
                { bizNumber: newBizNumber }
            );
            return result;
        } catch (error) {
            return createError("Mongoose", 400, error);
        }
    }
    return createError("DB", 500, new Error("there is no other db for this requests"));
};

const deleteCard = async (cardId) => {
    if (db === "mongodb") {
        try {
            let card = await Card.findByIdAndDelete(cardId);
            if (!card) {
                return createError("Mongoose", 404, new Error("Card not found or unauthorized"));
            }
            return card;
        } catch (error) {
            return createError("Mongoose", error.status || 400, error);
        }
    }
    return createError("DB", 500, new Error("there is no other db for this requests"));
};

module.exports = { getCards, getCard, getMyCards, createCard, updateCard, likeCard, changeBizNumber, deleteCard };
