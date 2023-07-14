const {Router} = require("express") //Configure Router for App
const router = Router()

//Controller Functions
const {addAuthor, getAuthor, getAuthorAndBooks, deleteAuthor} = require("../controllers/author.controllers")

module.exports = router

router.post('/create', addAuthor)
router.delete('/delete', deleteAuthor)