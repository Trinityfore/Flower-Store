//require dependencies
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products')
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))
app.use(express.static('public'))


//seed 
app.get('/flowers/seed',(req,res)=> {
    const data =[
        {
            name:'Peony',
            description: 'Pink and white varieties',
            img: 'https://i.imgur.com/0nyRSLo.jpg',
            price: '$4',
            qty: '10',
            
        },
        {
            name:'Dahlias',
            description: 'Locally grown, colors vary',
            img: 'https://i.imgur.com/wd99Mwb.jpg',
            price: '$3',
            qty: '15',
            
        },
        {
            name:'Tubberrose',
            description: 'String',
            img: 'https://i.imgur.com/KWtYRPe.jpg',
            price: '$3',
            qty: '15',
            
        },
        {
            name:'Purple Boquet',
            description:'pre-made seasonal boquets',
            img:'https://i.imgur.com/5bnC54i.jpg',
            price:'$25',
            qty:'30',
        }
    ]
    Product.deleteMany({}, (err,deleted)=> {
        Product.create(data, (err,item)=>{
            res.redirect('/flowers')
        })
    })
})  


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

//delete route
app.delete('/flowers/:id', (req,res)=> {
    Product.findByIdAndDelete(req.params.id, (err,delted)=>{
        res.redirect('/flowers')
    })
})
//update route
app.put('/flowers/:id',(req,res)=> {
    Product.findByIdAndUpdate(req.params.id,req.body, { new: true },(err,updated)=>{
        if(err){
            res.send('error')
        } else {
            res.redirect('/flowers')
        }
    })
})

//create route
app.post('/flowers', (req,res)=> {
    Product.create(req.body, (err,posted)=> {
        if(err){
            res.send('error')
        }else{
            res.redirect('/flowers')
        }
    })
})

//edit route
app.get('/flowers/:id/edit', (req,res)=> {
    Product.findById(req.params.id, (err,item) =>{
        res.render('edit.ejs', { item })
    })
})

//show route

app.get('/flowers/:id', (req,res)=> {
    Product.findById(req.params.id,(err,item)=> {
        res.render('show.ejs', { item })
    })
})

//buy 
app.get('/flowers/:id/buy', (req,res)=> {
    Product.findById(req.params.id, (err,item)=> {
        if(item.qty){
            item.qty--
            item.save(()=>{
                res.redirect(`/flowers/${item.id}`)
            })
        } else {
            res.redirect(`/flowers/${item.id}`)
        }
    })
})


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('express is listening on: ' + PORT)
})