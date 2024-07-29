const express  = require('express');
const client = require('./redis')
const axios = require('axios');
const app = express()

console.log('kismat bhai siuu')



const string = async() => {
    try{

        // const res1 = await client.set("bike:1", "Deimos");
        // console.log(res1,'res1');  // OK
        // const res2 = await client.get("bike:1");
        // console.log(res2,'res2');  // Deimos

        // await client.set("plane-crash",105)
        // const result = await client.incr("plane-crash", 1)
        // console.log(result)
        // const final = await client.get("plane-crash")
        // console.log(final,'final')

        // const mcet = await client.mSet([
        //     ["school","hari"],
        //     ["sports","krishna"],
        //     ["hotel","esha"]
        // ])
        // console.log(mcet,'mcet')
        // const mgat = await client.mGet(["school","hotel","sports"])
        // console.log(mgat,'mgat')

        // const achievement = await client.set("medal",5)
        // console.log(achievement,'achievement')

        // const increment = await client.incrBy("medal",4) 
        // console.log(increment,'increment')

        const decrement = await client.decrBy("medal",5) 
        console.log(decrement,'decrement')

        
    }
     catch (err) {
            console.error('Error running Redis list example:', err);
        } finally {
            // Close the Redis client
            await client.quit();
        }
}
string()




app.listen(8080,()=>{
    console.log('listening on port 8080')
})