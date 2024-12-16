# Services API with Pagination

This API provides an endpoint to retrieve services from the database, with optional pagination functionality. By default, the API returns the first 6 services unless specific pagination parameters are provided.

## Base URL

`https://your-server-url.com/`

## Endpoint: `/services`

### Method: `GET`

### Description

Fetches a list of services with optional pagination. You can control the number of services returned and specify the page to retrieve. If no pagination parameters are provided, the default response will include the first 6 services.

### Query Parameters

| Parameter | Type   | Required | Default | Description                                             |
|-----------|--------|----------|---------|---------------------------------------------------------|
| `page`    | Number | No       | 1       | The page number to fetch.                               |
| `limit`   | Number | No       | 6       | The number of services per page. Use `0` to fetch all services (no limit). |

### Example Requests

1. **Get Paginated Services**  
   This request fetches services on page 2 with a limit of 5 services per page:

   ```bash
   GET /services?page=2&limit=5
   ```

   **Response** (JSON):
   ```json
   [
     {
       "_id": "service_id_1",
       "name": "Service 1",
       "description": "Description of Service 1",
       "price": 100,
       "image": "https://example.com/image1.jpg"
     },
     {
       "_id": "service_id_2",
       "name": "Service 2",
       "description": "Description of Service 2",
       "price": 200,
       "image": "https://example.com/image2.jpg"
     }
     // More services...
   ]
   ```

2. **Get All Services**  
   This request fetches all available services (no pagination):

   ```bash
   GET /services?limit=0
   ```

   **Response** (JSON):
   ```json
   [
     {
       "_id": "service_id_1",
       "name": "Service 1",
       "description": "Description of Service 1",
       "price": 100,
       "image": "https://example.com/image1.jpg"
     },
     {
       "_id": "service_id_2",
       "name": "Service 2",
       "description": "Description of Service 2",
       "price": 200,
       "image": "https://example.com/image2.jpg"
     }
     // More services...
   ]
   ```

### Code Example

Here is the implementation of the `/services` endpoint:

```js
app.get('/services', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Page number (default 1)
  const limit = parseInt(req.query.limit) || 6; // Limit per page (default 6)
  
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const result = await serviceCollection
    .find() // Fetch all services
    .skip(skip) // Skip services based on page
    .limit(limit) // Limit services per page
    .toArray(); // Convert result to array
  
  res.send(result); // Return the services in response
});
```

### Error Handling

If an error occurs while fetching services, the server will respond with an error message:

- **Status**: `500 Internal Server Error`
- **Response** (JSON):
   ```json
   {
     "message": "Server Error",
     "error": "Error description"
   }
   ```

## Running Locally

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your MongoDB connection credentials:
   ```bash
   DB_USER=your_mongodb_user
   DB_PASS=your_mongodb_password
   ```
4. Start the server:
   ```bash
   npm start
   ```

The API will run on the specified port (default: `process.env.PORT`).
