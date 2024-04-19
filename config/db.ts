const Sequelize = require('sequelize');

const sequelize = new Sequelize('payment_app', 'root', '', {
    host : 'localhost',
    dialect: 'mysql'
})


module.exports = sequelize ;