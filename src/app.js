// loading the express library
const express = require('express');

// create our app
const app = express();

// root route
app.get('',(req,res)=>{
    res.send('hello express');
})
// help route
app.get('/help',(req,res)=>{
    res.send('this is help page')
})

// about route
app.get('/about',(req,res)=>{
    res.send('this about page')
})

// weather route
app.get('/weather',(req,res)=>{
    res.send('this is weather page');
})
const port=4000
app.listen(port,()=>{
    console.log('server is on at port '+port)
})