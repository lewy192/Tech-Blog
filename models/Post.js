const { Model, DataTypes } = require("sequelize");

const User = require("./User");

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        postTitle: {
            type: DataTypes.STRING(52),
            allowNull: false,
        },
        postContent: { type: DataTypes.TEXT, allowNull: false },
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
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Post;
