const Book = require("../services/models/book.model")
const Author = require("../services/models/author.model")

const addAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body)

        res.status(201).json({body:author})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const getAuthor = async(req, res) => {
    try {
        let author = null

        if (req.body.type === "name") {
            author = await Author.findOne({
                where: {authorName: req.body.value}
            })
        } else if (req.body.type === "id") {
            author = await Author.findOne({
                where: {id: req.body.value}
            })
        }

        res.status(200).json({body:author})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const getAuthorAndBooks = async(req, res) => {
    try {
        let author = null

        if (req.body.type === "name") {
            author = await Author.findOne({
                where: {authorName: req.body.value},
                include:Book
            })
        } else if (req.body.type === "id") {
            author = await Author.findOne({
                where: {id: req.body.value},
                include:Book
            })
        }
        res.status(200).json({body:author})
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