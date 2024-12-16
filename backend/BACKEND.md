# Backend Setup with MongoDB

### 1. Initialize Project

1. Create a local repository and open it with VS Code.
2. Initialize npm:

    ```bash
    npm init -y
    ```

3. Install necessary dependencies:

    ```bash
    npm install express cors mongodb dotenv
    ```

4. Create a file named `index.js`.

5. In the `scripts` section of `package.json`, add the following line:

    ```json
    "start": "node index.js"
    ```

### 2. Create Basic Express Server

In the `index.js` file, add the following code:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the server side');
});

app.listen(port, () => {
  console.log(`This server is running on port: ${port}`);
});
```

### 3. Start the Server

You can start the server using any of the following commands:

- `node index.js`
- `nodemon index.js`
- `npm start`

### 4. Connect to MongoDB Atlas

1. Visit MongoDB Atlas and log in.
2. Use the following credentials:
   - **User**: `user`
   - **Password**: `i3qxVIM2R6JUsoS7`
3. Go to your cluster and click **Connect**.
4. Choose **Drivers**.
5. Copy the connection string and view the full sample code. 

Add the following code in `index.js`:

```javascript
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clustermuntasir.bwzlexy.mongodb.net/?retryWrites=true&w=majority&appName=clusterMuntasir`;

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } finally {
    // Uncomment this line if you want to keep the connection open
    // await client.close();
  }
}

run().catch(console.dir);
```

### 5. Secure Credentials with dotenv

1. Create a `.env` file in the root directory and add:

    ```env
    DB_USER=YOURUSERNAME
    DB_PASSWORD=YOURDBPASSWORD
    ```

2. Ensure `.env` and `node_modules` are ignored by adding them to `.gitignore`:

    ```bash
    echo ".env" >> .gitignore
    echo "node_modules" >> .gitignore
    ```

### 6. CRUD Operations

#### Create Data

```javascript
const database = client.db("insertDB");
const haiku = database.collection("haiku");

app.post('/user', async (req, res) => {
  const user = req.body;
  const result = await haiku.insertOne(user);
  res.send(result);
});
```

#### Read Data

```javascript
app.get('/users', async (req, res) => {
  const result = await haiku.find().toArray();
  res.send(result);
});
```

#### Delete Data

```javascript
app.delete('/user/:id', async (req, res) => {
  const id = req.params.id;
  const result = await haiku.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});
```

#### Update Data

Use `PUT` for full replacements and `PATCH` for partial updates.

```javascript
app.put('/user/:id', async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
  };
  const result = await haiku.updateOne(filter, updateDoc, options);
  res.send(result);
});
```

### 7. Handling CORS Issues

To resolve CORS issues when sending `PATCH` requests:

```javascript
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],  // Add PATCH method
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### 8. Deploy to Vercel

1. Install Vercel:

    ```bash
    npm install -g vercel
    ```

2. Check the version:

    ```bash
    vercel --version
    ```

3. Create a `vercel.json` file:

    ```json
    {
      "version": 2,
      "builds": [
        {
          "src": "./index.js",
          "use": "@vercel/node"
        }
      ],
      "routes": [
        {
          "src": "/(.*)",
          "dest": "/",
          "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
        }
      ]
    }
    ```

4. Deploy:

    ```bash
    vercel --prod
    ```

5. Set environment variables in Vercel:

   Go to `vercel.com > Project > Settings > Environment Variables` and add `DB_USER` and `DB_PASSWORD`.