const express = require("express");

const UserModel = require("../models/User");

const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {
    const {email} = req.body;

    if(await UserModel.findOne({email})){
        return res.status(400).json({
            error: true,
            message:"User exists",
        });
        
        // para indicar qual erro foi
    }
    const User = await UserModel.create(req.body);
    User.password = undefined;
    
        //exclui password da visualizacao do json
        //observacao: aparentemente enquanto se fazia requisicao ela funcionava mas ate esse 
        //momento aqui em que se usou o model para criar um user seguindo o Schema do mongoose , 
        //nada era criado no banco 
        
    return res.json({
        error:false,
        message:"Registrado com sucessooooo",
        data: User
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

        return res.json(user);  
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