import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          await currentUser.reload();
          setUser({ ...auth.currentUser });
        } catch (error) {
          console.error("Error reloading user:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);


  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const loginWithGithub = () => signInWithPopup(auth, githubProvider);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, error, setError, signUp, login, loginWithGoogle, loginWithGithub, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
