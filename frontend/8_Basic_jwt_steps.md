steps of jwt implementation
---------------------------
1. install jwt
    install command: npm i jsonwebtoken

2. import jwt in backend
    const jwt = require('jsonwebtoken')

3. create a secret
    to create a secret, we will go to terminal. type 'node' and enter
    then we will type "require('crypto').randomBytes(64).toString('hex )" and then enter
    copy the 64 bit secret

4. store the secret in .env file
    ACCESS_TOKEN_SECRET=64_bit_secret

5. create a jwt related api and create a token
    app.post("/jwt", async(req, res)=>{
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
      res.send({token})
    }) 

6. set jwt for onAuthStateChanged method in 'AuthProvider' file
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
      setUser(currentUser);
      if(currentUser){
        const userInfo = {email: currentUser.email};
        axiosPublic.post('/jwt', userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token);
          }
        })
      }else{
        localStorage.removeItem('access-token');
      }
    })
    setLoading(false)
  }, [])

7. now, we will send token (within those request which needs authorization) back to backend via headers in axios request. we will use, headers: {authorization: `bearer ${localStorage.getItem('access-token')}`} and send this inside http request.

  axiosSecure.get('/users', {headers: {authorization: `Bearer ${localStorage.getItem('access-token')}`}})

8. in the backend, we will receive the token in which api we want to secure. we could do that in the api, but we will use a middleware. we will name it verifyToken.
note: middleware has 3 (three) parameter. Request,  Response, Next. We will call next as soon as, we verify the token. and we will use middleware in the middle of the api path.
  const verifyToken = (req, res, next)=>{
    console.log("inside verifyToken: " + req.headers);
    if(!req.headers.authorization){
      return res.status(401).send({message: "forbidden access!!"})
    }
    const token = request.headers.authorization.split(' ')[1]
    console.log(token)
    if(!token){
      return res.status(400).send({message: "Bad Request..."})
    }
    else{
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded)=>{
        if(error){
          //invalid token
          return res.status(401).send({message: "forbidden access!!"})
        }
        req.decodedData = decoded;
      })
    }
    next();
  }
------------------------------------------------------------------------------------
great!!!! just following these 8 steps, jwt verification basic setup has been made.
------------------------------------------------------------------------------------