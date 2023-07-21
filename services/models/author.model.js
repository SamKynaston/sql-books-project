const {DataTypes} = require("sequelize")
const database = require("../sql")

const Model = database.define("Author", {
    authorName: {type:DataTypes.STRING, allowNull:false, unique:true},

    authorEmail: {type:DataTypes.STRING, allowNull:false, unique:true},

    authorPassword: {type:DataTypes.STRING, allowNull:false}
})

module.exports = Model