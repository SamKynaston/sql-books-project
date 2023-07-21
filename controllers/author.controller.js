//Imports
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Book = require("../services/models/book.model")
const Author = require("../services/models/author.model")

const addAuthor = async (req, res) => {
    try {
        console.log(true)
        const author = await Author.create(req.body)
        
        res.status(201).json({body:{
            "name": author.authorName
        }})

    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const getAuthor = async(req, res) => {
    try {
        let author = await Author.findOne({
            where: req.body
        })

        if (!author) {
            return res.status(404).json({body:{}})
        }

        return res.status(201).json({body:{
            "name": author.authorName
        }})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const getAuthorAndBooks = async(req, res) => {
    try {
        let author = await Author.findOne({
            where: req.body,
            include:Book
        }) || null

        res.status(201).json({body:{
            "name": author.authorName,
            "books": author.Books
        }})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const deleteAuthor = async(req, res) => {
    try {
        await Author.destroy({where: {id:req.user.id}})
        res.status(200).json({body:true})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const authenticateAuthor = async(req, res) => {
    try {
        const user = await Author.findOne({
            where: {
                authorName:req.body.authorName
            }
        })
        const token = jwt.sign({id:user.id}, process.env.SECRET)
        
        //Send Token
        res.status(200).json({body:token})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

module.exports = {
    addAuthor,
    getAuthor,
    getAuthorAndBooks,
    deleteAuthor,
    authenticateAuthor
}