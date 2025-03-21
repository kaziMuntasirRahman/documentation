# SERVER organization documentation

## This Documentation shows how to organize server.js file. It helps to keep write clean and readable file

## `9 steps` to organize server file

1. In server.js file, first import `express`, `cors`, `dotenv`, `connectDB` modules.

```js
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/mongoClient')
```

2. Create an instance of express

```js
const app = express()
```

3. Set port no

```js
const port = process.env.PORT || 5000
```

4. Call the middlewares (automated)

```js
// //middlewares
app.use(cors())
app.use(express.json())
```

5. (optional, to check server connection) hit a '/' request

```js
app.get('/', (_, res) => {
  res.send('Hello from the server side...')
})
```

6. (optional, to check mongodb establishment is successful)

```js
connectDB()
```

7. import routes

```js
// Import Routes
const healthRoutes = require('./routes/1_Health')
const examRollRoutes = require('./routes/2_Exam_Room')
```

8. hit those api

```js
// use those routes
app.use('/', healthRoutes)
app.use('/', examRollRoutes)
```

9. set app listener

```js
app.listen(port, () => {
  console.log(`This server is running in the port no: ${port}`)
})
```

---

## demo server.js file

```js
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/mongoClient')

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
  res.send('Hello from the server side...')
})

// check if mongodb establishment is successful
connectDB()

// Import Routes
const healthRoutes = require('./routes/1_Health')
const examRollRoutes = require('./routes/2_Exam_Room')

// use those routes
app.use('/', healthRoutes)
app.use('/', examRollRoutes)

app.listen(port, () => {
  console.log(`This server is running in the port no: ${port}`)
})
```
