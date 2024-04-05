const express = require('express');

const app = express();
app.get('/',(req,res)=>{
    res.json({
        error:false,
        message:'acesso bem sucedido'
    });
});

app.listen(3001, ()=>{
    console.log('Server is runinngnggg uhuuuu');
})