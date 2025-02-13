# **Frontend Setup for Espresso Emporium**

## **1. Initial Vite Setup**
```bash
npm create vite@latest espresso-emporium-client -- --template react
cd espresso-emporium-client
code .
```

- **OR**, if you want to create the setup in an existing folder:
```bash
npm create vite@latest .
```

- Choose **React** as the framework and **JavaScript** variant.

- Install necessary packages:
```bash
npm install react-router-dom
npm install localforage match-sorter sort-by 
npm run dev
```

---

## **2. Tailwind CSS & Daisy UI Setup**

### **2.1 Tailwind CSS Installation**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Add the following imports in your `index.css` file:
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

- Update the `content` section in `tailwind.config.js`:
```javascript
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```

### **2.2 Daisy UI Installation**
```bash
npm i -D daisyui@latest
```

- Update `tailwind.config.js` to include Daisy UI:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#ff3811'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  }
}
```

- In your `index.html` file, set the `data-theme='light'` attribute in the `<html>` tag:
```html
<html lang="en" data-theme="light">
```

### **2.3 ESLint Configuration**
- In your `.eslintrc.cjs` file, set the `node` environment property:
```javascript
  env: {
    node: true, 
  }
```

---

## **3. Setting Up React Router**

- Create a folder `routes` inside `src`.
- Inside `routes`, create a `Routes.jsx` file:
```javascript
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
]);

export default router;
```

- Set up the router in `main.jsx`:
```javascript
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";

<RouterProvider router={router} />
```

---

## **4. Firebase Setup**

### **4.1 Firebase Project Setup**
- Go to [Firebase Console](https://console.firebase.google.com) and create a new project.
- Stop Google Analytics and continue.
- Register your app by clicking the **Web** icon `</>` and provide a web app nickname.
- Use the **npm** option and copy the Firebase installation code.

### **4.2 Firebase Installation**
```bash
npm install firebase
```

- Inside `src/firebase`, create a `firebase.config.js` file:
```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export default auth;
```

### **4.3 Firebase Authentication Setup**
- From the left panel in Firebase Console, go to **Build** > **Authentication** and click **Get Started**.
- Enable the desired sign-in methods, such as Google authentication.
  
### **4.4 .env.local Configuration**
- Create a `.env.local` file at the root of your project and add Firebase configuration keys (ensure `.local` is added to `.gitignore`):
```bash
VITE_APIKEY=AIzaSyBp1-x-7BiFuLYU8O7oZaG1bb9RrA9TROk
VITE_AUTHDOMAIN=espresso-emporium0.firebaseapp.com
VITE_PROJECTID=espresso-emporium0
VITE_STORAGEBUCKET=espresso-emporium0.firebasestorage.app
VITE_MESSAGINGSENDERID=1093491117760
VITE_APPID=1:1093491117760:web:344d221c08cd8b770ce725
```

- Access these values in `firebase.config.js` using `import.meta.env`.

### **4.5 Firebase Context API Setup**
- Create an `AuthProvider.jsx` file inside `src/provider`:
```javascript
import { createContext } from "react";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const authInfo = { user: "riaz" };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
```

- Wrap the router in `main.jsx` with `<AuthProvider>`:
```javascript
import AuthProvider from './provider/AuthProvider';

<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
```

### **4.6 Managing Auth State**
```javascript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });
  return () => {
    unsubscribe();
  };
}, []);
```

---

## **5. Firebase Hosting Setup**

### **5.1 Firebase Hosting Configuration**
- Inside Firebase Console, choose **Hosting** under **Build**.
- Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

- Login to Firebase:
```bash
firebase login
```

- Initialize Firebase hosting:
```bash
firebase init
```

- Choose the following options:
  - **Hosting: Configure files for Firebase Hosting**
  - **Use an existing project**
  - Set `dist` as the public directory
  - Choose `y` for single-page app
  - For GitHub builds, choose **no**

- Build the project:
```bash
npm run build
```

- Deploy to Firebase:
```bash
firebase deploy
```

### **5.2 Access Hosted URL**
- Firebase will provide a hosting URL after successful deployment.

---

## **6. Axios Setup for Data Handling**

### **6.1 Install Axios**
```bash
npm install axios
```

### **6.2 Get Data Using Axios**
```javascript
useEffect(() => {
  axios.get('/')
    .then(data => {
      console.log(data.data); // Always use data.data
    });
}, []);
```

### **6.3 Post Data Using Axios**
```javascript
axios.post('/user', data)
  .then(data => {
    console.log(data.data);
  });
```

---

## **7. Private Route Setup**

- Create `PrivateRoute.jsx` to protect certain routes:
```javascript
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="loading-spinner size-16"></div>;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
```

- Use `<PrivateRoute>` to wrap pages that require authentication:
```javascript
<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
```