const express = require("express");

const UserModel = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const router = express.Router();

const generateToken = (user = {})=>{
    return jwt.sign({
        id:user.id,
        name: user.name
    }, authConfig.secret , {
        expiresIn: 86400
    });
};
router.post("/register", async (req, res) => {
    const {email} = req.body;

    if(await UserModel.findOne({email})){
        return res.status(400).json({
            error: true,
            message:"User exists",
        });
    }
    const user = await UserModel.create(req.body);
    user.password = undefined;
    
    return res.json({
        user,
        token: generateToken(user)
    });
})

router.post("/authenticate", async(req, res) => {
    // Destructure email and password directly from req.body
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email }).select("+password"); // Ensure you await the promise and check using the destructured email

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "User not found",
            });
        }

        if(!await bcrypt.compare(password,user.password)){// se der errado o auth, valida a senha e criptografia
            return res.status(400).send({
                error: true,
                message: "Invalid password",
            });
        }
        user.password = undefined;
      

        return res.json({
            user,
            token: generateToken(user)
        });  
    } catch (err) {
        // Handle possible errors, like database connection issues
        console.error(err);
        return res.status(500).json({
            error: true,
            message: "An error occurred while processing your request."
        });
    }
});
module.exports = router;