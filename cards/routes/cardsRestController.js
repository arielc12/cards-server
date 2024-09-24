const express = require("express");
const { createCard, getCards, getCard, updateCard, deleteCard, likeCard, changeBizNumber } = require("../models/cardsAccessDataService");
const auth = require("../../auth/authService");
const normalizeCard = require("../helpers/normalizeCard");
const { handleError } = require("../../utils/handleErrors");
const validateCard = require("../validation/cardValidationService");


const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return handleError(res, 403, "only business user can create cards");
        }
        let card = await normalizeCard(req.body, userInfo._id);
        const errorMessage = validateCard(req.body);
        if (errorMessage !== "") {
            return handleError(res, 400, "validation error " + errorMessage);
        }
        card = await createCard(card);
        res.status(201).send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        let cards = await getCards();
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/my-cards", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isbusiness) {
            return handleError(res, 403, "only business user can get my-cards");
        }
        let cards = await getCard(userInfo._id);
        if (!cards) {
            return handleError(res, 404, "No cards found");
        }
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let card = await getCard(id);
        if (!card) {
            return handleError(res, 404, "No cards found");
        }
        res.send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        let { id } = req.params;
        let newCard = req.body;
        const fullCardFromDB = await getCard(id);
        if (userInfo._id.toString() !== fullCardFromDB.user_id.toString() && !userInfo.isAdmin) {
            return handleError(res, 403, "only the user who created this card or admin can update this card");
        }
        const errorMessage = validateCard(req.body);
        if (errorMessage !== "") {
            return handleError(res, 400, "validation error " + errorMessage);
        }
        newCard = await normalizeCard(newCard, userInfo._id);
        let card = await updateCard(id, newCard);
        res.send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        let { id } = req.params;
        const fullCardFromDB = await getCard(id);
        if (userInfo._id.toString() !== fullCardFromDB.user_id.toString() && !userInfo.isAdmin) {
            return handleError(res, 403, "only the user who created this card or admin can delete this card");
        }
        let card = await deleteCard(id);
        res.send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.patch("/:cardId", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        let { cardId } = req.params;
        const userId = userInfo._id;
        let card = await likeCard(userId, cardId);
        res.send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.patch("/biz-number/:cardId", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        let { cardId } = req.params;
        const fullCardFromDB = await getCard(cardId);
        if (userInfo._id.toString() !== fullCardFromDB.user_id.toString() && !userInfo.isAdmin) {
            return handleError(res, 403, "only the user who created this card or admin can change biz number of this card");
        }
        const { newBizNumber } = req.body;
        let card = await changeBizNumber(cardId, newBizNumber);
        res.send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

module.exports = router;
