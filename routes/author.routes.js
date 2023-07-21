const {Router} = require("express") //Configure Router for App
const router = Router()

//Controller Functions
const {addAuthor, getAuthor, getAuthorAndBooks, deleteAuthor} = require("../controllers/author.controller")

module.exports = router

//Get
router.get('/get', getAuthor) //Get Author Only
router.get('/get/books', getAuthorAndBooks) //Get Author & Books

//Authenticate
router.get('/authenticate')

//Post
router.post('/create', addAuthor)

//Delete
router.delete('/delete', deleteAuthor)
