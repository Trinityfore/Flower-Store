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
    Product.find({}, (err,flower)=> {
        res.render('index.ejs', { flower })   
    })
    
})

//new route
app.get('/flowers/new', (req,res)=> {
    res.render('new.ejs')
})


//edit route
app.get('/flowers/:id', (req,res) => {
    Product.findById(req.params.id, (err,item) =>{
        res.render('show.ejs', { item })
    })
})

//show route

app.get('/flowers/:id', (req,res)=> {
    Product.findById(req.params.id,(err,item)=> {
        res.render('show.ejs', { item })
    })
})



const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('express is listening on: ' + PORT)
})