const {Router} = require("express") //Configure Router for App
const router = Router()

const {getAllBooks, getBook, addBook, deleteBook, updateBook} = require("../controllers/books.controller")

//Get
router.get('/get/all', getAllBooks)
router.get('/get', getBook)

//Create
router.post('/create', addBook)

//Delete
router.delete('/delete', deleteBook)

//Put (Update)
router.put('/update', updateBook)

module.exports = router