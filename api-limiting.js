const client = require('./redis')
async function rateLimiter(req,res,next){

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress.slice(0,9)
    console.log('ip',ip)

    const request = await client.incr(ip)
    console.log(request,' number of request ')

    let ttl
    if(request === 1){
       await client.expire(ip,60)
       ttl=60
    }else {
        ttl = await client.ttl(ip)
    }
}
module.exports = rateLimiter