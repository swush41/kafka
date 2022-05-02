const Kafka = require('kafkajs').Kafka
require('dotenv').config()
async function run(){
    try {
        const kafka = new Kafka({
            "clientId" : "app",
            "brokers" : [process.env.IP]     
        })

        const admin = kafka.admin()
        console.log('Connecting....')
        await admin.connect()
        console.log('Connected!')

        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions" : 2
            }]
        })

        await admin.disconnect()
        console.log("Disconnected!")

    } catch (error) {
        console.error(`Error: ${error}`)
    }
    finally{
        process.exit(0)
    }
}

run()