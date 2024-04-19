const {DataTypes} = require('sequelize');
const __sequelize = require('../config/db');

const _User = __sequelize.define('User', {
    fullName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    amount:{
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});


module.exports = _User;