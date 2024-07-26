const express  = require('express');
const axios = require('axios');
const app = express()
const client = require('./redis')



app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.get('/product', async(req, res) => {
    let post
    if(client.isReady){
        post = await client.get('post-data')
    }
    if(post){
        console.log("Cache hit")
        return res.send(JSON.parse(post))
    }else{
        console.log("Cache miss")
        post = await axios.get('https://jsonplaceholder.typicode.com/posts')
        if(client.isReady){
            client.setEx('post-data', 10, JSON.stringify(post.data))  // cache for 1 hour
        }
        res.send(post.data)
    }
})

// LIST
// async function runRedisListExample() {
//     try {
//         // Clear the list if it exists
//         await client.del('mylist');

//         // Push elements to the list (left push)
//         await client.lPush('mylist', 'one');
//         await client.lPush('mylist', 'two');
//         await client.lPush('mylist', 'three');
//         await client.lPush('mylist', 'ten');

//         // Push elements to the list (right push)
//         await client.rPush('mylist', 'four');
//         await client.rPush('mylist', 'five');

//         // Get all elements from the list
//         const listItems = await client.lRange('mylist', 1,3);
//         console.log('List items:', listItems);

//         // // Pop an element from the left of the list
//         const leftPoppedItem = await client.lPop('mylist');
//         console.log('Left popped item:', leftPoppedItem);

//         const length = await client.lLen('mylist');
//         console.log('length of my list ', length);

//         // Pop an element from the right of the list
//         const rightPoppedItem = await client.rPop('mylist');
//         console.log('Right popped item:', rightPoppedItem);

//         // Get the updated list
//         const updatedListItems = await client.lRange('mylist', 0, -1);
//         console.log('Updated list items:', updatedListItems);
//     } catch (err) {
//         console.error('Error running Redis list example:', err);
//     } finally {
//         // Close the Redis client
//         await client.quit();
//     }
// }
// runRedisListExample()


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