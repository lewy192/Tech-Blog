const postData = require("./postSeed.json");
const userData = require("./userSeed.json");
const { User, Comment, Post } = require("../models");
const sequelize = require("../config/connection");

seedAllModels = async () => {
    await sequelize.sync({ force: false });
    // const user = await User.bulkCreate(userData);
    const posts = await Post.bulkCreate(postData);
};

seedAllModels();
