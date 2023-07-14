require("dotenv").config() //Environment Variables

//Express
const express = require("express") 
const app = express() // API

//Models
const Book = require("./services/models/book.model")
const Author = require("./services/models/author.model")

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const syncTables = () => {
    Author.hasMany(Book);
    Book.belongsTo(Author);

    Book.sync({alter:true});
    Author.sync({alter:true})
}

//Routes
const AuthorRoutes = require("./routes/author.routes")
const BookRoutes = require("./routes/books.routes")

//Configure Routes
app.use("/book", BookRoutes)
app.use("/author", AuthorRoutes)

//Configure the Port
const port = process.env.port

//Configure Server
app.listen(port, () => {
    syncTables()
    console.log(`[LISTENING] localhost:${process.env.PORT}`);
})