const {Sequelize} = require('sequelize')

if (process.env.DB_DIALECT == 'postgres') {

    module.exports = new Sequelize(
        process.env.DB_NAME, // Название БД
        process.env.DB_USER, // Пользователь
        process.env.DB_PASSWORD, // ПАРОЛЬ
        {
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT
        }
    )
}
else if (process.env.DB_DIALECT == 'sqlite') {

    module.exports = new Sequelize(
        process.env.DB_NAME, // Название БД
        process.env.DB_USER, // Пользователь
        process.env.DB_PASSWORD, // ПАРОЛЬ
        {
            dialect: 'sqlite',
            storage: "db/123.sqlite"
        }

    )
}