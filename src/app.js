// loading the path library
const path = require('path');
// loading the express library
const express = require('express');

// create our app
const app = express();

// getting the path of the public folder contains our static pages
const dirPath =path.join(__dirname,'../public');

// setting view engine to hbs 
app.set('view engine','hbs')

//serving static directory
app.use(express.static(dirPath))

//root route
app.get('',(req,res)=>{
    res.render('index',{
        name:'Mohamed',
        age:27
    })
})

// help route
app.get('/help',(req,res)=>{
    res.render('help',{})
})

// about route
app.get('/about',(req,res)=>{
    res.render('about',{})
})

// weather route
app.get('/weather',(req,res)=>{
    res.send('this is weather page');
})
const port=4000
app.listen(port,()=>{
    console.log('server is on at port '+port)
})