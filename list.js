const express  = require('express');
const app = express()
const client = require('./redis')


async function runRedisListExample() {
    try {
        // const res1 = await client.lPush('bikes:repairs', 'bike:1');
        // console.log(res1); 
        // const data = await client.lPush('pilot:plane','moon:5')
        // const res27eol = await client.rPush(
        //     'bikes:repairs', ['bike:1', 'bike:2', 'bike:3', 'bike:4', 'bike:5']
        //   );
        //   console.log(res27eol);  // 5
        // const poped =await client.rPop('bikes:repairs')
        // console.log(poped);
        // const a = await client.rLen('pilot:plane')
        // console.log(a)
        // const res13 = await client.lRange('pilot:plane', 0,-1);
        // console.log(res13);  // ['bike:1']    
        
        // const v = await client.lTrim()

        const b = await client.lPop('pilot:plane')
        console.log(b);
        const res49 = await client.lTrim('bikes:repairs', 0, 2);
        console.log(res49);  // 'OK'

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