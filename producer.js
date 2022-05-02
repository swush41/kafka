const Kafka = require('kafkajs').Kafka
require('dotenv').config()
produce();

const msg = process.argv[2]; // get console entry as message
async function produce(){
    try {
        const kafka = new Kafka({
            "clientId" : "app",
            "brokers" : [process.env.IP]     
        })

        const producer = kafka.producer()
        console.log('Connecting....')
        await producer.connect()
        console.log(msg[0] < "n")
        const partition = msg[0] < "n" ? 0 : 1;
        const timestamp = Date.now()
        const result = await producer.send({
            "topic" : "Users",
            "messages": [
               {
                "value" : msg,
                "partition" : partition,
                "timestamp" : timestamp
               }

            ]
        
        })
    
        await producer.disconnect()
        console.log(`Sent message: ${JSON.stringify(result)}`)

    } catch (error) {
        console.error(`Error: ${error}`)
    }
    finally{
        process.exit(0)
    }
}
