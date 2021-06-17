const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");

class User extends Model {
    checkPassword = (password) => {
        return bcrypt.compareSync(password, this.password);
    };
}

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
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = User;
