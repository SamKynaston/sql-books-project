const {Router} = require("express") //Configure Router for App
const router = Router()

const {getAllBooks, getBook, addBook, deleteBook, updateBook} = require("../controllers/books.controller")
const {authenticateToken} = require("../middleware/authentication.middleware")

//Get
router.get('/get/all', getAllBooks)
router.get('/get', getBook)

//Create
router.post('/create', authenticateToken, addBook)

//Delete
router.delete('/delete', authenticateToken, deleteBook)

//Put (Update)
router.put('/update', authenticateToken, updateBook)

module.exports = router