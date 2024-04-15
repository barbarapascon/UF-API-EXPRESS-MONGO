
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error: true,
            message: "No token provided."
        });
    }
    const parts = authHeader.split(" ");
    if(parts.length !== 2){
        return res.status(401).json({
            error: true,
            message: "Invalid Token."
        })
    }
    const [scheme, token] = parts;
    if(scheme.indexOf("Bearer") !== 0){
        return res.status(401).json({
            error: true,
            message: "Token with wrong format."
        })
    }
   return jwt.verify(token, authConfig.secret, (err, decoded) =>{
        console.log(err);
        console.log(decoded); 
        if(err){
            return res.status(401).json({
                error: true,
                message: "Token invalid/expired."
            });
        }
        req.userLogged = decoded;

        
        return next();
    })
}