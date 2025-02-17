# Registration Function Documentation

## Overview

This function handles the user registration process. It takes input from a form, validates the data, creates a new user, and stores the relevant user details in the database.

## Code Example

```js
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [photoURL, setPhotoURL] = useState('');
const { createUser } = useContext(AuthContext);
const navigate = useNavigate();

const handleRegistration = async (e) => {
    e.preventDefault();
    // Send registration data
    const response = await createUser(name, email, password, photoURL);
    if (response.email) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: "You're successfully signed in to GetItDone!",
            text: 'Start browsing or offering services now.',
            showConfirmButton: false,
            timer: 2500,
        });
        setTimeout(() => navigate('/'), 1500);

        // Extract additional info from response
        const { phoneNumber, metadata } = response;
        const modifiedUser = {
            displayName: name,
            email,
            photoURL,
            phoneNumber,
            createdAt: metadata.createdAt,
            lastLoginAt: metadata.lastLoginAt,
            password,
        };

        // Save user to database
        const result = await axios.post('https://get-it-done-server.vercel.app/user', modifiedUser);
        console.log(result.data);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "We couldn't sign you in. Please try again.",
            footer: response.message,
        });
    }
};
```

## Breakdown of the Function

1. **State Declarations:**
   - `name`, `email`, `password`, `photoURL`: These are form field values, updated by their respective input fields using `useState` hooks.
   - `createUser`: Imported from `AuthContext` to handle user creation.
   - `navigate`: A hook from `react-router-dom` used for programmatic navigation after a successful registration.

2. **`handleRegistration` Function:**
   - **Parameters:** Accepts the event object `e` to prevent the default form submission behavior.
   - **`createUser` Call:** Sends the `name`, `email`, `password`, and `photoURL` to create a new user.
     - **Success Case:** Shows a success notification using `Swal.fire`, navigates to the homepage after 1.5 seconds, and saves user information (including additional metadata) to the database.
     - **Failure Case:** Displays an error notification with the error message in the footer.

3. **Modified User Object:**
   - After a successful registration, user details are modified and enriched with additional information such as `phoneNumber`, `createdAt`, `lastLoginAt`, etc.
   - These details are then sent to the server API (`/user`) to be stored in the backend.

4. **Error Handling:**
   - If registration fails, an error modal is shown using SweetAlert, and the error message from the response is displayed.

