const Book = require("../services/models/book.model")
const Author = require("../services/models/author.model")

const getAllBooks = async(req, res) => {

}

const getBook = async(req, res) => {

}

const addBook = async(req, res) => {
    try {
        const author = await Author.findOne({
            where:{[req.body.authorType]: req.body.authorVal}
        })

        if (!author) {return res.status(500).json({body:"Author was not found"})}

        const newBook = await Book.create(req.body.book)

        res.status(201).json({body:newBook})
    } catch (err) {
        res.status(500).json({body:err.message})
    }
}

const deleteBook = async(req, res) => {
    
}

const updateBook = async(req, res) => {
    
}

module.exports = {
    addBook,
    getBook,
    getAllBooks,
    deleteBook,
    updateBook
}