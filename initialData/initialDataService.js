const { getCards, createCard } = require("../cards/models/cardsAccessDataService");
const { getUsers, registerUser } = require("../users/models/usersAccessDataService");
const initialData = require("../initialData/initialData.json");
const { generateBizNumber } = require("../cards/helpers/generateBizNumber");

const initializeDatabase = async () => {
    try {
        const existingUsers = await getUsers();
        const existingCards = await getCards();

        if (existingUsers.length < 3) {
            const usersToAddCount = 3 - existingUsers.length;
            const usersToAdd = initialData.users.filter(user =>
                !existingUsers.some(existingUser => existingUser.email === user.email)
            ).slice(0, usersToAddCount);
            for (const userData of usersToAdd) {
                const registeredUser = await registerUser(userData);
                console.log(`Created user: ${registeredUser.email}`);
            }
        }

        const updatedUsers = await getUsers();
        const eligibleUsers = updatedUsers.filter(user => user.isAdmin || user.isBusiness);
        const randomIndex = Math.floor(Math.random() * eligibleUsers.length);
        const randomUser = eligibleUsers[randomIndex];

        if (existingCards.length < 3) {
            const cardsToCreateCount = 3 - existingCards.length;
            const cardsToCreate = initialData.cards.filter(card =>
                !existingCards.some(existingCard => existingCard.email === card.email)
            ).slice(0, cardsToCreateCount);

            for (const cardData of cardsToCreate) {
                cardData.user_id = randomUser._id;
                cardData.bizNumber = await generateBizNumber();
                const existingCard = existingCards.find(existingCard => existingCard.email === cardData.email);
                if (!existingCard) {
                    const card = await createCard(cardData);

                    if (card instanceof Error) {
                        console.error(`Failed to create card for user ${randomUser.email}: ${card.message}`);
                    } else {
                        console.log(`Created card: ${card.title} for user ${randomUser.email}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error initializing the database: ' + error.message);
    }
};

module.exports = { initializeDatabase };
