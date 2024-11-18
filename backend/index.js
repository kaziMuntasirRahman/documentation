const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from the server side.')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustermuntasir.bwzlexy.mongodb.net/?retryWrites=true&w=majority&appName=clusterMuntasir`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const carDB = client.db('carDoctor')
const userCollection = carDB.collection('users')
const serviceCollection = carDB.collection('Services')
const bookingCollection = carDB.collection('bookings')

async function run () {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )

    //get all services info
    app.get('/services', async (req, res) => {
      const result = await serviceCollection.find().toArray()
      res.send(result)
    })

    //get a service details info
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id
      const result = await serviceCollection.findOne({ _id: new ObjectId(id) })
      res.send(result)
    })

    //upload user info
    app.post('/users', async (req, res) => {
      const user = req.body
      const result = await userCollection.insertOne(user)
      res.send(result)
    })

    //update user info after signin
    app.put('/users', async (req, res) => {
      const {
        uid,
        displayName,
        email,
        photoURL,
        emailVerified,
        isAnonymous,
        providerId,
        createdAt,
        lastLoginAt,
        password
      } = req.body
      const query = { email: email }
      const options = { upsert: true }
      const updatedUser = {
        $set: {
          uid,
          displayName,
          email,
          photoURL,
          emailVerified,
          isAnonymous,
          providerId,
          createdAt,
          lastLoginAt,
          password
        }
      }
      const result = await userCollection.updateOne(query, updatedUser, options)
      res.send(result)
    })

    //post booking
    app.post('/bookings', async (req, res) => {
      const bookingInfo = req.body
      const result = await bookingCollection.insertOne({
        ...bookingInfo,
        status: false
      })
      res.send(result)
    })

    //get all booking of a customer
    app.get('/bookings', async (req, res) => {
      const query = req.query
      const result = await bookingCollection.find(query).toArray()
      res.send(result)
    })

    //delete booking
    app.delete('/bookings/:id', async (req, res) => {
      const id = req.params.id
      const result = await bookingCollection.deleteOne({
        _id: new ObjectId(id)
      })
      res.send(result)
    })

    //get all services info
    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })

    //auth related api
    app.post('/jwt', async (req, res) => {
      const user = req.body
      console.log(user)
      // const token = jwt.sign(user, "Secret", { expiresIn: '1h' })
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })

      res
        .cookie('token', token, {
          httpOnly: false,
          secure: false,
          sameSite: 'none'
        })
        .send({ success: true })
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close()
  }
}
run().catch(console.dir)

app.listen(port, () => {
  console.log('This server is running in the port no: ' + port)
})
