# Middleware Organization Documentation

This documentation shows how to keep the `middlewares` separate from the main server and api endpoints. And how to access them from endpoints.
---
`5 steps` to organize middleware
--- 
1. create a middleware file with .js extension inside middleware folder(to organize middlewares)
```file
logger.js
```
2. write the middleware
```js
// A simple logger middleware
function logger(req, res, next) {
  console.log(`${req.method} request made to: ${req.url}`);
  next(); // Call the next middleware or route handler
}
```
3. finally, export the middleware
```js
module.exports = logger;
```
4. import the middleware from api (not in middleware)
```js
const logger = require('../middleware/logger');  // Import the middleware
```
5. now, we can use the middleware just like we do
```js
router.get('/health', logger, (req, res) => {
    res.send("Health API is hit");
});
```

---
A Demo Middleware File
---
```js
// A simple logger middleware
function logger(req, res, next) {
  console.log(`${req.method} request made to: ${req.url}`);
  next(); // Call the next middleware or route handler
}

module.exports = logger;
```