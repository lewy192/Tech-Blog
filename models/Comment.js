const { Model, DataTypes } = require("sequelize");

const User = require("./User");
const Post = require("./Post");

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: User, key: "id" },
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Post, key: "id" },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        freezeTableName: true,
    }
);
module.exports = Comment;
