const express  = require('express');
const app = express()
const client = require('./redis')


async function runRedisListExample() {
    try {
        const res1 = await client.lPush('bikes:repairs', 'bike:1');
        console.log(res1); 
        const data = await client.lPush('pilot:plane','surya:5')
        const poped =await client.lPop('pilot:plane')
        console.log(poped);
        const a = await client.lLen('pilot:plane')
        console.log(a)
        //rpush

    } catch (err) {
        console.error('Error running Redis list example:', err);
    } finally {
        await client.quit();
    }
}
runRedisListExample()



app.listen(8080,()=>{
    console.log('listening on port 8080')
})