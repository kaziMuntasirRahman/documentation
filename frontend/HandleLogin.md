# Documentation: handleRegistration function

## Overview
The `handleRegistration` function is used to register new users. It captures form inputs for name, email, password, and photoURL, and then uses the `createUser` function from the `AuthContext` to handle the actual registration. Upon successful registration, a success alert is displayed, and the user is navigated to the home page. The function also sends user information to the backend for storage.

## Code
```javascript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [photoURL, setPhotoURL] = useState('');
const { createUser } = useContext(AuthContext);
const navigate = useNavigate();

const handleRegistration = async (e) => {
    e.preventDefault();
    const response = await createUser(name, email, password, photoURL);
    if (response.email) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "You're successfully signed in to GetItDone!",
            text: "Start browsing or offering services now.",
            showConfirmButton: false,
            timer: 2500
        });
        setTimeout(() => navigate('/'), 1500);
        const { phoneNumber, metadata } = response;
        const modifiedUser = {
            displayName: name,
            email,
            photoURL,
            phoneNumber,
            createdAt: metadata.createdAt,
            lastLoginAt: metadata.lastLoginAt,
            password
        };
        const result = await axios.post('https://get-it-done-server.vercel.app/user', modifiedUser);
        console.log(result.data);
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "We couldn't sign you in. Please try again.",
            footer: response.message
        });
    }
};
```

## Breakdown
1. **State Setup**:
   - `name`: Captures the name of the user.
   - `email`: Captures the email input.
   - `password`: Stores the password input.
   - `photoURL`: Stores the URL for the user’s profile photo.

2. **createUser Function**:
   - This function is provided by the `AuthContext` and handles the registration of the user with the given information.

3. **Event Handling**:
   - `handleRegistration`: This asynchronous function handles form submission and calls the `createUser` function to register the new user.

4. **Response Handling**:
   - Upon successful registration, a success alert is shown (`Swal.fire`) and the user is navigated back to the home page (`setTimeout` + `navigate('/')`).
   - User details such as `name`, `email`, and `photoURL` are then sent to the backend using `axios.post` to store the user info.
   - If registration fails, an error alert is displayed.

## Libraries Used
- **React Context**: For user registration functionality (`AuthContext`).
- **Swal.fire**: To show success or error notifications.
- **axios**: To send the user data to the backend.

## Example Use Case
The user fills out the registration form, submits the form, and upon successful registration, they receive a success message. Their data (name, email, photo) is sent to the server and stored.

