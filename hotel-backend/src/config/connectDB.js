const { Sequelize } = require('sequelize');
require('dotenv').config();

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    'hotel', 'root', null,
    {
        host: 'localhost',
        port: '3307',
        dialect: 'mysql',
        logging: false,

        query: {
            raw: true,
        },
        timezone: '+07:00',
    }
);

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
module.exports = connectDB;
