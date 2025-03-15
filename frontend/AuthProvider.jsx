import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const serverURL = 'http://localhost:3000';

  useEffect(() => {
    // Subscribe to the auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set user if logged in
        console.log(currentUser);
      } else {
        setUser(null);  // Set user to null if logged out
        console.log('User is absent.');
      }
      setLoading(false);
    });
    // Cleanup function to unsubscribe on component unmount
    return () => {
      unsubscribe();
    };
  }, []);  // Empty dependency array ensures this runs once when component mounts

  const createUser = async (name, email, password) => {
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name, photoURL: "https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp" })
      return credentials.user;
    } catch (error) {
      console.log(error)
      console.log(error.message)
    }finally{
      setLoading(false)
    }
  }

  const logIn = async (email, password) => {
    try {
      setLoading(true);
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      return credentials.user;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }


  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Error during sign out:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      serverURL,
      createUser,
      logIn,
      logOut
    }}>
      {children}
    </AuthContext.Provider >
  );
};

export default AuthProvider;