const {DataTypes} = require("sequelize")
const database = require("../sql")

const Model = database.define("Author", {
    bookTitle: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },

    bookAuthor:{
        type: DataTypes.INTEGER
    },

    bookGenre: {
        type: DataTypes.STRING
    },
})

module.exports = Model