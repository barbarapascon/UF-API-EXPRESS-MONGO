const express = require("express");

const UserModel = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    const {email} = req.body;

    if(await UserModel.findOne({email})){
        return res.status(400).json({
            error: true,
            message:"User exists",
        });// para indicar qual erro foi
    }
    const User = await UserModel.create(req.body);
    User.password = undefined;//exclui password da visualizacao do json
        //observacao: aparentemente enquanto se fazia requisicao ela funcionava mas ate esse 
        //momento aqui em que se usou o model para criar um user seguindo o Schema do mongoose , 
        //nada era criado no banco 
        
    return res.json({
        error:false,
        message:"Registrado com sucessooooo",
        data: User
    });
})

module.exports = router;