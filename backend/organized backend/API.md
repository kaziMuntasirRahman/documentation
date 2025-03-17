# API Organization Documentation

This documentation show how to organization an api endpoint, keeping it separate from server file and database file. And how to import middleware, and finally export the api. 
---
`5 Steps` to create and write separate api
---
1. create a file with `.js extension` inside /endpoints folder
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

4. hit the endpoint with `router` just like `app`
```js
router.get('/users', (req, res) => {
    res.send("Health api is hit")
})
```

5. finally, `export router`
```js
module.exports = router
```
- **If you want to add middleware, visit `middleware.md` documentation.**

demo `user.js` api
---
```js
const express = require('express')
const router = express.Router()

router.get('/health', (req, res) => {
    res.send("health api is hit")
})

module.exports = router
```