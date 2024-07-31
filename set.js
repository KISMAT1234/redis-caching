const express  = require('express');
const app = express()
const client = require('./redis')

  async function  set(){
    // const res1 = await  client.sAdd('bikes:racing:france', 'bike:1')
    // console.log(res1)  

    // const res5 = await client.sIsMember('bikes:racing:france', 'bike:1')
    // console.log(res5)  // >>> true

    // const a = await client.sAdd("plane",'airbus')
    // console.log(a)
    // const res5 = await client.sIsMember('plane', 'airbus')
    // console.log(res5)  // >>> true

     const res7 = await client.sInter('plane')
     console.log(res7)  // >>> {'bike:1'}


    const res8 = await client.sCard('plane')
    console.log(res8)  // >>> 3
}
set()


app.listen(8080,()=>{
    console.log('listening on port 8080')
})

