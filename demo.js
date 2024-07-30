const express  = require('express');
const app = express()
const client = require('./redis')
app.listen(8080,()=>{
    console.log('listening on port 8080')
})