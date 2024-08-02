const client = require('./redis')

 function apiLimiter({seconds, allowedHits}){
    return async function (req, res, next) {
        // const i = (req.headers['x-forwarded-for'] || req.connection.remoteAddress)
        // console.log(i)
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).slice(0,9)
        console.log('ip',ip)
    
        const request = await client.incr(ip)
        console.log(request,' number of request ')
    
        let ttl
        if(request === 1){
           await client.expire(ip,seconds)
           ttl = 60
        }else {
            ttl = await client.ttl(ip)
            console.log(ttl,'time taken')

        }

        if(request > allowedHits){
            console.log(ttl,'time taken')
            return res.status(503).json({message:'To many request'})
        }else{
            next()
        }
    }

   
}
module.exports = apiLimiter