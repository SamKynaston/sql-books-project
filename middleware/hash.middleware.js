const bcrypt = require("bcrypt")

const hashPass = async(req,res,next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password,parseInt(process.env.SALT_ROUNDS))
    } catch (err) {
        res.status(500).json({body:err.Message})
    }
}