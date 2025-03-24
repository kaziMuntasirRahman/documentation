# Basic jwt (JSON Web Token) Setup Guide

### 1. `backend:` JWT Installation

- Visit [jwt.io](https://jwt.io)
- Navigate to **Libraries**
- Filter by language: **Node.js**
- Choose `jsonwebtoken` and click on **View Repo**
- Read the documentation
- install jsonwebtoken in the `server side` with the following command

```bash
npm i jsonwebtoken
```

### 2. `backend:` import `jsonwebtoken` in your `index.js` file.

```js
const jwt = require('jsonwebtoken')
```

### 3. `backend:` Generate secret key and save it in .env file for token creation

- Open terminal and enter `Node.js environment` with the following command

```bash
node
```

- Generates 64 random bytes using Node.js's crypto module and converts them into a hexadecimal string.

```bash
require('crypto').randomBytes(64).toString('hex');
```

- Copy the generated string and save it in .env file

```bash
JWT_SECRET=<Your 64-byte Hex Secret>
```

### 4. `backend:` Create a jwt `Token`

- Create access token with `jwt.sign` method. The method takes 3 parameters. `user`, `secret` and an object with `expiresIn` property.
- Get the `user` from `req.body`,
- `secret` from `.env` file
- and expiration time: `expiresIn` can be given in String Formats- ('10s' - 10 seconds), (5m - 5 minutes), ('2h' - 2 hours), ('1d' - 1 day), ('7d' - 7 days), ('1w' - 1 week), ('1y' - 1 year). or Numeric Values: We can also use a numeric value, which represents seconds. For example: 3600 - 1 hour (3600 seconds)

```js
app.post('/jwt', async (req, res) => {
  const user = req.body
  console.log(user)
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
  return res.send({ token })
})
```

---

### 5. `Frontend:` After a sign-in or registration on the client side, send a the `/jwt post request` request with current user.

```js
axios.post('http://localhost:5000/jwt', { email: user.email })
```

Server will send a token in response like following:

```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFmcmFhakBnbWFpbC5jb20iLCJpYXQiOjE3NDI2NTc5MjYsImV4cCI6MTc0Mjc0NDMyNn0.ic6oue8Tt9_t29dN-mrqd1nQj4g4nG3vZ6cV3aiK8sI"
}
```

### 6. `frontend:` After receiving the token, save it in `localStorage`. _(Though, local storage is not the option but we will do in this way this time.)_

```js
const response = await axios.post('http://localhost:5000/jwt', {
  email: user.email
})
localStorage.setItem('jwt_token', response.data.token)
```

### 7. `frontend:` Now we have to do it once just after login or registration. But we can do better by sending the request after every auth state changed.

```js
useEffect(() => {
  setLoading(true)
  const unsubscribe = onAuthStateChanged(auth, async currentUser => {
    if (currentUser) {
      setUser(currentUser)
      // console.log(currentUser)
      // console.log('user is present as:', currentUser?.displayName)
      const jwtResponse = await axiosPublic.post('/jwt', {
        email: currentUser.email
      })
      if (jwtResponse.data.token) {
        localStorage.setItem('jwt_token', jwtResponse.data.token)
      }
    } else {
      setUser(null)
      console.log('user is absent')
      localStorage.removeItem('jwt_token')
    }
    setLoading(false)
  })

  return () => {
    unsubscribe()
  }
}, [])
```

### The jwt token is created and saved in local storage. Now, we have to pass the token with every secured routes and verify it from the server side. If the token verification get successful, the server will response the request. But if the token verification get unsuccessful, then the server will reject the request.

### 8. `frontend:` Send token with every secured routes.

- We will send the token inside `authorization`, inside `headers` object. We normally use, `Bearer ` before the token for further security.

```js
headers: {
  authorization: `Bearer ${localStorage.getItem('access-token')}`
}
```

and send this with every secured route.

```js
axios.get('/users', {
  headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
})
```

### Now, we can send token with every secured routes like this or we can do better by just keeping the token in a central place, where the token will automatically be sent with every secured routes. That's why, we will use `axios interceptor`.

### 8*. *(better)\* `frontend:` Send token with axios interceptor.

- create a custom hook named `useAxiosSecure.jsx`
- create an instance of axios named `axiosSecure` outside hook definition and set the baseURL with localhost or cloud server. so that, we don't have to write server base URL with every request.

```js
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/',
  // baseURL: 'https://tech-hunt-server-blond.vercel.app/',
  timeout: 5000
})
```

- now, we will intercept the request before the request is send. The following request interceptor runs before each request is sent.

```js
axiosSecure.interceptors.request.use(config => {
  const token = localStorage.getItem('access-token')
  config.headers.authorization = `bearer ${token}`
  return config
})
```

this setup sends the token with every request with instance of axios `axiosSecure`. the full basic hook is given below.

```js
import axios from 'axios'

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/',
  // baseURL: 'https://tech-hunt-server-blond.vercel.app/',
  timeout: 5000
})

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(config => {
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `bearer ${token}`
    return config
  })
  return axiosSecure
}
export default useAxiosSecure
```

### 9. `frontend`: Import the `axiosSecure` instance of axios from `useAxiosSecure` hook, where we need to secure route and use `axiosSecure` instead of `axios`.

```js
const axiosSecure = useAxiosSecure()
...
....
...
axiosSecure.get('/products')
```

this will send the `get /products` request with baseURL and access-token.

### Now, we will verify the token from the backend. Valid token will response with data and invalid token reject the request with error status and error message.

### 10. `backend`: Verify the token request

We will verify the token in several steps.

- if request doesn't have `authorization` inside `req.headers`, reject the request

```js
if (!req.headers.authorization) {
  return res.status(403).send({ message: 'Forbidden Access...' })
}
```

- then, if the request doesn't have token inside `req.headers.authorization`, reject the request

```js
const token = req.headers.authorization.split(' ')[1]
if (!token) {
  return res.status(403).send({ message: 'Forbidden Access...' })
}
```

- then, we will verify it with `jwt.verify()` method. the method takes `3` parameter. `requested-token`, `server-access-token`, and a callback function taking `error` and `decoded`. if verification process failed, `error` will be true. and we will reject the request.

```js
jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
  if (error) {
    return res.status(401).send({ message: 'Bad Request...' })
  }
})
```

- if the token passed all `3` tests, we will proceed to response the request. we will use the `decoded` to response.

```js
if (!req.headers.authorization) {
    return res.status(403).send({ message: 'Forbidden Access...' })
}
const token = req.headers.authorization.split(' ')[1]
if (!token) {
    return res.status(403).send({ message: 'Forbidden Access...' })
}
jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
  if (error) {
      return res.status(401).send({ message: 'Bad Request...' })
  }
  req.decoded = decoded
})

...........
proceed to response..
..........
```

### Now, we can write these lines of verification code in every secured routes before proceeding request. which will work fine. Or we can do it in a better way, with `middleware`. We will create a `verifyToken` middleware and just add the middleware name after routes path and before the callback function.

### 10*. *(better)\* verify the token with `VerifyToken` middleware

- create verifyToken middleware and pass with `next()` if token successfully verified.

```js
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'Forbidden Access...' })
  }
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(403).send({ message: 'Forbidden Access...' })
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: 'Bad Request...' })
    }
    req.decoded = decoded
    next()
  })
}
```

### 11. Add the middleware with secured api

```js
app.delete('/users/:id', verifyToken, async (req, res) => {
  ...process to delete user....
})
```

---

---

---

# Advanced jwt part

### 12. Verify Admin middleware

- use verify admin after verifying token
- get decoded data from `req.decoded`, which was set inside `verifyToken` middleware
- get email from `req.decoded.email`
- check role of the user against the email address
- if user role is admin, proceed to next. or reject request from here.

```js
const connectDB = require('../db/mongo_client')

const verifyAdmin = async (req, res, next) => {
  const { email } = req.decoded
  try {
    const { userCollection } = await connectDB()
    const user = await userCollection.findOne({ email: email })
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized...' })
    }
    const isAdmin = user.status === 'admin'
    if (!isAdmin) {
      return res.status(403).send({ message: 'Forbidden' })
    }
    next()
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('....verifyAdmin....')
  }
}

module.exports = verifyAdmin
```

### 13. axiosSecure instance to handle corrupt token, or invalid request

```js
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/',
  // baseURL: 'https://tech-hunt-server-blond.vercel.app/',
})

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext)

  axiosSecure.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token')
    config.headers.Authorization = `bearer ${token}`
    // console.log("config",config)
    return config;
  })

  //*****/ This response interceptor runs after each response is received from the server.
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        console.log("Error code in the interceptor: ", status);
        await logOut();
        window.location.href = '/'; 
      }
      return Promise.reject(error);
    }
  );

  return (axiosSecure);
};

export default useAxiosSecure;
```
