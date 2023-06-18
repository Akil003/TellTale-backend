
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://akilsubedi:ttMTjj178tFJPWEC@audiobooks.5oc37ef.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri)

async function getConnection(){
    try{
        await client.connect()
        const db = client.db('AudioBooks')
        return Promise.resolve(db)
    }
    catch(e){
        return Promise.reject(e)
    }
}

module.exports = getConnection
