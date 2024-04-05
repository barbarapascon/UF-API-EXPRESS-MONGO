
const mongoose = require("mongoose");

 mongoose.connect("mongodb+srv://barbarapascon:Panambib3...@universofelino.7nzrd9w.mongodb.net/?retryWrites=true&w=majority&appName=UniversoFelino",{},(error)=>{
    if (error){
        console.log('falha ao autenticar com mongodb');
        console.log(error);
        return;
    } 
        console.log('Conexao com mongo db estavel');
 })

mongoose.Promise = global.Promise;

module.exports = mongoose;
