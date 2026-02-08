const jwt = require("jsonwebtoken")

function verifyToken(req , res , next){
    const token = req.header("Authorization")

    if(!token){
        return res.status(401).json({
            error:true,
            message:"Access Denied! No Token Provided."
        })
    }

    try{
        const tokenClean = token.replace("Bearer ", "");

        const verified = jwt.verify(tokenClean , process.env.JWT_SECRET);

        req.user = verified;

        next();
    }catch(error){
        res.status(400).json({
            error:true,
            message:"Invalid Token"
        })
    }
}

function checkRole(allowedRoles){
    return function (req , res , next){
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                error:true,
                message:"Access Forbidden! You don't have permission."
            })
        }
        next();
    }
}

module.exports = { verifyToken, checkRole };