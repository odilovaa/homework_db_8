const jwt = require("jsonwebtoken");
const config = require("../../config");

const isAuth = async (req, res, next) =>
{
    const key = config.jwtsecretkey
    const token = req.headers.authorization;

    if(!token) return res.status(401).json({message: "Invalid token"})

    jwt.verify(token, key, (error, data) =>
    {
        if (error) 
        {
            return  res.status(404).json({message:"You need register"});
        }
        req.c_id = data.id;
        next();

    })
};

const isAdmin = async (req, res, next) =>
{
    const {admin_password} = req.body;
    console.log(admin_password);

    if(admin_password == 1227)
    {
        res.c_id = 1
        next()
    }
    
    return  res.status(404).json({message: "Only admin can add workers!"});
}

module.exports = { isAuth, isAdmin};