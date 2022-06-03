const sequelize = require('../db')
const {DataTypes} = require('sequelize')
// const {joinSQLFragments} = require("sequelize/types/utils/join-sql-fragments");
//////////////////////////
// const Basket = sequelize.define('basket', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })
//
// const BasketDevice = sequelize.define('basket_device', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })
//
// const Device = sequelize.define('device', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
//     price: {type: DataTypes.INTEGER, allowNull: false},
//     rating: {type: DataTypes.INTEGER, defaultValue: 0},
//     img: {type: DataTypes.STRING, allowNull: false},
// })
//
// const Type = sequelize.define('type', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// })
//
// const Brand = sequelize.define('brand', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// })
//
// const Rating = sequelize.define('rating', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: DataTypes.INTEGER, allowNull: false},
// })
//
// const DeviceInfo = sequelize.define('device_info', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     title: {type: DataTypes.STRING, allowNull: false},
//     description: {type: DataTypes.STRING, allowNull: false},
// })
//
// const TypeBrand = sequelize.define('type_brand', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })

///////////////

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Poll = sequelize.define('poll', {
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true},
    description: {type: DataTypes.STRING},
})

const Question = sequelize.define('question', {
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    type: {type: DataTypes.INTEGER},
})

const Option = sequelize.define('option', {
    //console.log ("Option!")
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    text: {type: DataTypes.TEXT}
})

const Submission = sequelize.define('submission', {
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    submitTime: {type: DataTypes.DATE}
})

const Answer = sequelize.define('answer', {
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    text: {type: DataTypes.TEXT}
})

User.hasMany(Submission)
Submission.belongsTo(User)

Poll.hasMany(Submission)
Submission.belongsTo(Poll)

Poll.hasMany(Question)
Question.belongsTo(Poll)

Question.hasMany(Option)
Option.belongsTo(Question)

Question.hasMany(Answer)
Answer.belongsTo(Question)

Submission.hasMany(Answer)
Answer.belongsTo(Submission)

module.exports = {
    User,
    Poll,
    Question,
    Option,
    Answer,
    Submission
}





