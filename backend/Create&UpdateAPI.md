# User API: Create or Update User

This API allows for creating a new user or updating an existing user. It checks if a user with a given email already exists and either creates a new record or merges the new data with the existing user data.

## API Endpoint: `/user`

### Method: `POST`

### Code:

```javascript
// post a new user
app.post('/user', async (req, res) => {
  const {
    displayName,
    email,
    photoURL,
    phoneNumber,
    createdAt,
    lastLoginAt,
    password
  } = req.body

  try {
    const existingUser = await userCollection.findOne({ email })
    const usersCount = await userCollection.countDocuments()
    let updatedUser

    // If the user is new
    if (!existingUser) {
      updatedUser = {
        id: usersCount + 1,
        name: displayName,
        email,
        isAvailable: true,
        title: '',
        bio: '',
        photoURL,
        coverPhotoURL: '',
        phoneNumber,
        address: '',
        fbAddress: '',
        linkedInAddress: '',
        twitterAddress: '',
        isVerified: false,
        createdAt,
        loggedInData: [lastLoginAt],
        services: [],
        bookedServices: [],
        earningHistory: [],
        spendingHistory: [],
        password
      }
      const result = await userCollection.insertOne(updatedUser)
      res.status(200).send(result)

    // If the user already exists
    } else {
      updatedUser = {
        ...existingUser,
        name: existingUser.name || displayName,
        photoURL: existingUser.photoURL || photoURL,
        createdAt: createdAt,
        loggedInData: [...existingUser.loggedInData, lastLoginAt],
        password: existingUser.password || password
      }
      const filter = { email }
      const updatedDoc = { $set: updatedUser }
      const options = { upsert: true }
      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      )
      res.status(200).send(result)
    }
  } catch (err) {
    res.status(500).send({ err, message: 'server error' })
  }
})
```

### How It Works:

1. **Check if User Exists**:
   - The API first checks the `userCollection` to see if a user with the provided email exists using `findOne({ email })`.

2. **New User Creation**:
   - If the user does **not exist** (`!existingUser`), a new user object (`updatedUser`) is created.
   - The new user is assigned a unique `id`, starting from the count of total users (`usersCount + 1`).
   - Various fields such as `name`, `email`, `photoURL`, `loggedInData`, etc., are initialized.
   - The `insertOne` method is used to insert this new user into the database.

3. **Updating an Existing User**:
   - If the user **already exists** (`existingUser`), the API updates the user's data.
   - It checks which fields in the existing user are missing and fills them in with the new data (e.g., if `photoURL` is missing, it will take the new `photoURL`).
   - The `loggedInData` array is updated by adding the latest login timestamp (`lastLoginAt`).
   - The `updateOne` method is used to update the user, with the `$set` operator ensuring that only the changed fields are updated. The `upsert: true` option is used to ensure an update or insert occurs in one operation.

4. **Response**:
   - The API sends a success response (`res.status(200).send(result)`) whether the user was created or updated.
   - In case of a server error, an error message is returned (`res.status(500).send({ err, message: 'server error' })`).

### Request Body Example:

```json
{
  "displayName": "John Doe",
  "email": "johndoe@example.com",
  "photoURL": "https://example.com/photo.jpg",
  "phoneNumber": "+1234567890",
  "createdAt": "2024-12-18T00:00:00.000Z",
  "lastLoginAt": "2024-12-18T09:05:43.000Z",
  "password": "securepassword"
}
```

### Example Usage:

- **Creating a New User**: If a user with the email `johndoe@example.com` does not exist in the database, the above data will create a new user.
  
- **Updating an Existing User**: If a user with the email `johndoe@example.com` exists, the API will update the user's data by adding the latest `lastLoginAt` timestamp and filling in any missing fields such as `photoURL` or `displayName`.