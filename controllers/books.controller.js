const Book = require("../services/models/book.model")
const Author = require("../services/models/author.model")

const getAllBooks = async(req, res) => {
    try {
        let books = await Book.findAll({
            where: {}
        }) || null

        res.status(200).json({body:books})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const getBook = async(req, res) => {
    try {
        let book = await Book.findOne({
            where: req.body
        }) || null

        res.status(200).json({body:book})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const addBook = async(req, res) => {
    try {
        const author = await Author.findOne({
            where: req.body.author
        })

        if (!author) {return res.status(500).json({body:"Author was not found"})}

        req.body.book["author"] = author.id
        const newBook = await Book.create(req.body.book)

        res.status(201).json({body:newBook})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const deleteBook = async(req, res) => {
    try {
        await Book.destroy({where: req.body})
        res.status(200).json({body:true})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const updateBook = async(req, res) => {
    try {
        const book = await Book.update(req.body.newDetails, {where:req.body.currentBook})
        res.status(200).json({body:book})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

module.exports = {
    addBook,
    getBook,
    getAllBooks,
    deleteBook,
    updateBook
}