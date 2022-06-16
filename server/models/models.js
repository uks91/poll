const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Poll = sequelize.define('poll', {
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING},
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

Option.hasMany(Answer)
Answer.belongsTo(Option)

module.exports = {
    User,
    Poll,
    Question,
    Option,
    Answer,
    Submission
}





