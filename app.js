const express = require('express');


const app = express();


//Routes 
app.get('/', (req, res) =>{
    res.send('Welcome to my app !!!');
});


app.listen(3000);