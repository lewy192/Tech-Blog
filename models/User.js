const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(24),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(66),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(320),
            allowNull: false,
        },
        firstName: { type: DataTypes.STRING(56), allowNull: false },
        lastName: { type: DataTypes.STRING(56), allowNull: false },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = User;
