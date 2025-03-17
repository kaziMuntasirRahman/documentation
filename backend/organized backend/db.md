# Organizing MongoDB database

This documentation helps to organize database client, database and collections separate.
---
## `6 steps` to organize database file

1. **Create a db.js file under db folder**

2. **Import `MongoClient`, `ServerApiVersion` from `mongodb`. also require `dotenv`.**
```js
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()
```

3. **Create url inside template string, using `DB_USER` and `DB_PASSWORD` from `.env` file**
```js
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustermuntasir.bwzlexy.mongodb.net/?retryWrites=true&w=majority&appName=clusterMuntasir`
```

4. create `mongodb client`
```js
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
```

5. create an asynchronous function, `connectDB`.  Create and return Database and collections inside the function.
```js
const connectDB = async () => {
  try {
    await client.connect()
    const db = client.db('HackathonDB')
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. Successfully connected to MongoDB!')
    return {
      seatCollection: db.collection('seat'),
      wifiLoginHistoryCollection: db.collection('wifi-login-history'),
      bookCollection: db.collection('book'),
    }
  } catch (err) {
    console.log('Failed to connect to MongoDB: ', err)
  }
}
```

6. Finally export the module
```js
module.exports = connectDB
```

---
## complete `db.js` demo file
```js
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustermuntasir.bwzlexy.mongodb.net/?retryWrites=true&w=majority&appName=clusterMuntasir`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const connectDB = async () => {
  try {
    await client.connect()
    const db = client.db('HackathonDB')
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. Successfully connected to MongoDB!')
    return {
      seatCollection: db.collection('seat'),
      bookCollection: db.collection('book'),
    }
  } catch (err) {
    console.log('Failed to connect to MongoDB: ', err)
  }
}

module.exports = connectDB
```