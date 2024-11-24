# **JWT (JSON Web Token) Setup Guide**

### **1. JWT Installation**
- Visit [jwt.io](https://jwt.io)
- Navigate to **Libraries**
- Filter by language: **Node.js**
- Choose `jsonwebtoken` and click on **View Repo**
- Read the documentation

### **2. Install jsonwebtoken in the Server**
```bash
npm i jsonwebtoken
```

- Require `jsonwebtoken` in your `index.js` file:
```javascript
const jwt = require('jsonwebtoken');
```

### **3. Create a JWT Token**
- Create a POST API to generate JWT tokens:
```javascript
app.post('/jwt', async (req, res) => {
  const user = req.body;
  console.log(user);
  const token = jwt.sign(user, 'secret', { expiresIn: '1h' });
  res.send(token);
});
```

- After a successful sign-in or registration on the client side, send a POST request to the server with the JWT request:
```javascript
axios.post('http://localhost:5000/jwt', { email: user.email });
```

- The backend will send the token in response.

---

### **4. Generate a Secret Key**
- Open a terminal and enter Node.js environment:
```bash
node
```

- Generate a random 64-byte secret:
```javascript
require('crypto').randomBytes(64).toString('hex');
```

- Copy the generated hex code and store it in your `.env` file:
```bash
ACCESS_TOKEN_SECRET=<Your 64-byte Hex Secret>
```

- Use the secret key in your `jwt.sign` function:
```javascript
app.post('/jwt', async (req, res) => {
  const user = req.body;
  console.log(user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res.send(token);
});
```

---

### **5. Storing JWT in Cookies**

- Visit [cookie-parser documentation](https://www.npmjs.com/package/cookie-parser) and install `cookie-parser`:
```bash
npm i cookie-parser
```

- Require and use `cookie-parser` as middleware in your server:
```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

- Use the `cookie()` function inside the JWT API to store the token in a cookie:
```javascript
app.post('/jwt', async (req, res) => {
  const user = req.body;
  console.log(user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none'
    })
    .send({ success: true });
});
```

#### **Cookie Options:**
- `httpOnly`: Restricts access to cookies from the frontend (JavaScript).
- `secure`: Ensures the cookie is only sent over HTTPS.
- `sameSite`: Determines whether the cookie can be sent to cross-site requests.

---

### **6. CORS Setup**
- Update CORS middleware to allow cookies between client and server:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
```

- On the frontend, ensure to send requests with credentials:
```javascript
axios.post('http://localhost:5000/jwt', data, { withCredentials: true });
```

---

### **7. Token Verification**
- Refer to [Module 60](https://www.academind.com/learn/react-node-js-token-authentication/) for further details on token verification.