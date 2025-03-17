# API Organization Documentation

## This documentation show how to organization an api endpoint, keeping it separate from server file and database file. And how to import middleware, and finally export the api.

## `7 Steps` to create and write separate api

1. create a file with `.js extension` inside api folder

```file
`user.js`
```

2. `import express`

```js
const express = require('express')
```

3. create a `router` to group related routes together

```js
const router = express.Router()
```

4. import `connectDB()` function from `db.js`.

```js
const connectDB = require('../db/db')
```

5. hit the endpoint with `router` just like `app`
```js
router.get('/users', (req, res) => {
    res.send("User api is hit")
})
```

6. Destructure desired `collection`
```js
router.get('/users', (req, res) => {
  const {userCollection} = await connectDB()
    res.send("User api is hit")
})
```

7. (optional)Add middleware if needed

```js
router.get('/users', verifyToken, (req, res) => {
  const {userCollection} = await connectDB()
    res.send("User api is hit")
})
```

8. finally, `export router`

```js
module.exports = router
```

- **If you want to add middleware, visit `middleware.md` documentation.**

## demo `user.js` api

```js
const express = require('express')
const router = express.Router()
const connectDB = require('../../db/db')
const verifyToken = require('../middleware/verifyToken');  // Import the middleware


router.get('/user', verifyToken, (req, res) => {
  const {userCollection} = await connectDB()
  res.send('user api is hit')
})

module.exports = router
```
