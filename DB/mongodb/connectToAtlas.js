const mongoose = require("mongoose");
const conncectionStringForAtlas = "";
const connectToAtlasDb = async () => {
    try {
        //await mongoose.connect(conncectionStringForAtlas);
        console.log("Connected to MongoDB in atlas");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
};

module.exports = connectToAtlasDb;