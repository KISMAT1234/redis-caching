const express  = require('express');
const axios = require('axios');
const app = express()
const client = require('./redis')
const rateLimiter = require('./limitation/rateLimiter')
// const Redis = require('ioredis')
// const redis = new Redis()

app.use('/api/', rateLimiter);

// app.get('/', (req, res) => {
//     res.send('Hello, World!')
// })





app.get('/', async(req, res) => {
    // console.log('Incoming request IP:', req.ip);
    // const first = req.headers['x-forwarded-for']
    // console.log('first',first)

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress.slice(0,9)
    console.log('ip',ip)

    const request = await client.incr(ip)
    console.log(request,' number of request ')

    if(request === 1){
        await client.expire(ip,60)
    }

    if(request > 10){
        return res.status(503).json({message:'To many request'})
    }

     res.status(200).json({message:'request successful'})
})

// app.get('/api/payment', (req, res) => {
//     res.send('product data!')
// })

// app.get('/api/product', async(req, res) => {
//     let counter = 0
//     for(i=0; i<1000000000; i++){
//       counter++
//     }
//     res.send('Rate limiting is working!');
// })

    // let post
    // if(client.isReady){
    //     post = await client.get('post-data')
    // }
    // if(post){
    //     console.log("Cache hit")
    //     return res.send(JSON.parse(post))
    // }else{
    //     console.log("Cache miss")
    //     post = await axios.get('https://jsonplaceholder.typicode.com/posts')
    //     if(client.isReady){
    //         client.setEx('post-data', 10, JSON.stringify(post.data))  // cache for 1 hour
    //     }
    //     res.send(post.data)
    // }

// LIST



// SET
// async function main() {
//     const setName = 'mySet';
  
//     // Adding items to the set
//     await client.sAdd(setName, 'item1');
//     await client.sAdd(setName, 'item2');
//     await client.sAdd(setName, 'item3');
  
//     // Checking membership
//     const isMember = await client.sIsMember(setName, 'item2');
//     console.log(`Is 'item2' in the set? ${isMember ? 'Yes' : 'No'}`);
  
//     // Fetching all members of the set
//     const allMembers = await client.sMembers(setName);
//     console.log('All members of the set:', allMembers);
  
//     // Removing an item from the set
//     await client.sRem(setName, 'item3');
  
//     // Fetching all members after removal
//     const updatedMembers = await client.sMembers(setName);
//     console.log('Updated members of the set after removal:', updatedMembers);
  
//     // Disconnect from client
//     client.disconnect();
//   }
  
//   main().catch(err => {
//     console.error('Error:', err);
//   });


// async function main() {
// const hashName = 'user:1000';

// // Setting fields in the hash
// await client.hSet(hashName, 'name', 'John Doe');
// await client.hSet(hashName, 'age', '30');
// await client.hSet(hashName, 'email', 'john.doe@example.com');

// // // Getting a specific field
// const name = await client.hGet(hashName, 'name');
// console.log('Name:', name);

// // // Fetching all fields and values
// const userDetails = await client.hGetAll(hashName);
// console.log('User Details:', userDetails);

// // Deleting a field from the hash
// await client.hDel(hashName, 'email');

// // Fetching all fields and values after deletion
// const updatedUserDetails = await client.hGetAll(hashName);
// console.log('Updated User Details:', updatedUserDetails);

// const increment = await client.hIncrBy(hashName,'age',20);
// console.log('Updated User Details:', increment);

// }
// main().catch(err => {
//     console.error('Error:', err);
//   });

app.listen(8080,()=>{
    console.log('listening on port 8080')
})




