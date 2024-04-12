const express = require('express');
const AuthController = require("./controllers/AuthController");
const AdiminController = require("./controllers/AdiminController");

const app = express();

app.use(express.json());// para visualizar o json no terminal

app.use("/auth", AuthController);
app.use("/adimin", AdiminController);

app.listen(3001, ()=>{
    console.log('Server is runinngnggg uhuuuu');
})