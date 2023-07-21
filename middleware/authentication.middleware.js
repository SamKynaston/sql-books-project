const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Author = require("../services/models/author.model")

const hashPass = async(req,res,next) => {
    try {
        req.body.authorPassword = await bcrypt.hash(req.body.authorPassword, parseInt(process.env.SALT_ROUNDS))
        next()
    } catch (err) {
        res.status(500).json({body:err.Message})
    }
}

const authenticatePassword = async(req,res,next) => {
    try {
        req.user = await Author.findOne({
            where: {
                authorName:req.body.authorName
            }
        })

        if (!req.user) {return res.status(401).json({body:"Incorrect User Details"})}

        const password = bcrypt.compare(req.body.authorPassword, req.user.authorPassword)
        
        if (!password) {return res.status(401).json({body:"Incorrect User Details"})}
        
        next();
    } catch (err) {
        console.log(err)
        res.status(500).json({body:err.Message})
    }
}

const authenticateToken = async(req,res,next) => {
    try {
        if (!req.header("Authorisation")) {
            return res.status(401).json({body:"Improper Authorisation Details"})
        }
        
        const decodedToken = jwt.verify(req.header("Authorisation").replace("Bearer ", ""), process.env.SECRET)
        const user = await Author.findOne({where: {id:decodedToken.id}})
        
        if (!user) {
            return res.status(401).json({body:"Improper Authorisation Details"})
        }

        req.user = user.dataValues
        next()
    } catch (err) {
        res.status(500).json({body:err.Message})
    }
}

module.exports = {hashPass, authenticatePassword, authenticateToken}