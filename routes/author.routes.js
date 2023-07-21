const {Router} = require("express") //Configure Router for App
const router = Router()

//Controller Functions
const {addAuthor, getAuthor, getAuthorAndBooks, deleteAuthor, authenticateAuthor} = require("../controllers/author.controller")
const {hashPass, authenticatePassword, authenticateToken} = require("../middleware/authentication.middleware")

module.exports = router

//Get
router.get('/get', getAuthor) //Get Author Only
router.get('/get/books', getAuthorAndBooks) //Get Author & Books

//Authenticate
router.get('/authenticate', authenticatePassword, authenticateAuthor)

//Post
router.post('/register', hashPass, addAuthor)

//Delete
router.delete('/delete', authenticateToken, deleteAuthor)
