const Kafka = require('kafkajs').Kafka
require('dotenv').config()
async function consume(){
    try {
        const kafka = new Kafka({
            "clientId" : "app",
            "brokers" : [process.env.IP]     
        })

        const consumer = kafka.consumer({'groupId' : 'test'}) // groupId must be a non-empty string.
        console.log('Connecting....')
        await consumer.connect()
        
        await consumer.subscribe({
            "topic" : "Users",
            "fromBeginning" :true
        })
        console.log('Reading....')
        await consumer.run({
            "eachMessage" : async result => {
                console.log(`Message: ${result.message.value} with partititon ${result.partition} at time:  ${result.message.timestamp}` )
            }
        })
    

    } catch (error) {
        console.error(`Error: ${error}`)
    }
    finally{

    }
}

consume();