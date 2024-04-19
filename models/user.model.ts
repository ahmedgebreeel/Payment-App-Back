const {DataTypes} = require('sequelize');
const __sequelize = require('../config/database');

const User = __sequelize.define('User', {
    fullName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    amount:{
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});


module.exports = User;