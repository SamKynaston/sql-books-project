const Book = require("../services/models/book.model")
const Author = require("../services/models/author.model")

const addAuthor = async (req, res) => {
    try {
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
        await Author.destroy({where: req.body})
        res.status(200).json({body:true})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

module.exports = {
    addAuthor,
    getAuthor,
    getAuthorAndBooks,
    deleteAuthor
}