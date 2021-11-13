// loading the path library
const path = require('path');
// loading the express library
const express = require('express');

// create our app
const app = express();

// getting the path of the public folder contains our static pages
const dirPath =path.join(__dirname,'../public');


app.use(express.static(dirPath))
console.log(dirPath);



// weather route
app.get('/weather',(req,res)=>{
    res.send('this is weather page');
})
const port=4000
app.listen(port,()=>{
    console.log('server is on at port '+port)
})