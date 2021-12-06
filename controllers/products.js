const express = require ('express');
const app = express();
const Product = require ('../models/products');

//index
app.post('/first', (req,res) => {
    res.send('youre here')
});
