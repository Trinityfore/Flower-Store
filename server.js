//require dependencies
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products')
//intilaize app
const app = express();


//configure settings
require('dotenv').config();

//connect & config mongoDB w/ mongoode

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;
//set up monogoDB event listners
db.on('error', (err) => console.log(err.message + 'mongo no run'))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))



// mount middleware
app.use(express.urlencoded({ extended: false}));

//index route
app.get('/flowers', (req,res) => {
    res.send('here is a flower')
})

//new route
app.get('/flowers/new', (req,res)=> {
    res.render('new.ejs')
})




const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('express is listening on: ' + PORT)
})