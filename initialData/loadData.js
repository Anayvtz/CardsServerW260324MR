const Card = require("../cards/models/mongodb/Card");
const User = require("../users/models/mongodb/User");
const fs = require('fs');
const { registerUser } = require("../users/models/usersAccessDataService");
const { normalizeCard } = require("../cards/helpers/normalizeCard");
const { createCard } = require("../cards/models/cardsAccessDataService");

const generateUsers = async () => {
    let userId = 0;
    try {
        const data = fs.readFileSync('./initialData/initialUsers.json', 'utf8');
        const users = JSON.parse(data);
        //await User.insertMany(users);
        let registeredUser;

        for (let i = 0; i < users.length; i++) {
            registeredUser = await registerUser(users[i]);
            console.log("B4 registeredUser._id=" + registeredUser._id);
            if (!userId && users[i].isBusiness) {
                console.log("registeredUser._id=" + registeredUser._id);
                userId = registeredUser._id;
            }
        }

    } catch (err) {
        console.log("generateUsers err:" + err.message);
        throw new Error(err.message);
    }
    return userId;
}
const generateCards = async (userId) => {
    try {
        const data = fs.readFileSync('./initialData/initialCards.json', 'utf8');
        const cards = JSON.parse(data);
        for (let i = 0; i < cards.length; ++i) {
            let card = await normalizeCard(cards[i], userId);
            console.log("card.userId=" + card.user_id);
            card = await createCard(card);
        }
    } catch (err) {
        console.log("generateCards err:" + err.message);
        throw new Error(err.message);
    }
}

module.exports = { generateUsers, generateCards };