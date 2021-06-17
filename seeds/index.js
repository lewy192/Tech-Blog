const postData = require("./postSeed.json");
const { User, Comment, Post } = require("../models");

seedAllModels = async () => {
    const posts = await Post.bulkCreate(postData);
};

seedAllModels();
