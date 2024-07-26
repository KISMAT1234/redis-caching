const {createClient} = require('redis')
require('dotenv').config()

const client = createClient({
    password: process.env.REDISS_SERVER_PASSWORD,
    socket: {
        host: 'redis-10897.c232.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 10897
    }
});
client.connect(console.log("Connected to redis server")).catch(console.error)
module.exports = client