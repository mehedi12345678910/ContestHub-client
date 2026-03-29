import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

import useAxios from "../hooks/useAxios";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const axiosSecure = useAxios();
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };
  const githubLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, githubProvider);
  };

  const logOut = () => {
    setLoader(true);
    return signOut(auth);
  };
  const profileUpdate = (name, photo) => {
    setLoader(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = currentUser.email;
        axiosSecure.post("/jwt", userInfo).then((res) => {
        
          localStorage.setItem("access-token", res?.data);
          setLoader(false);
        });
      } else {
        localStorage.removeItem("access-token");
        setLoader(false);
      }
    });
    return () => {
      return unSubscribe();
    };
  }, [axiosSecure]);
  console.log(user);

  const authInfo = {
    user,
    createUser,
    logIn,
    googleLogin,
    githubLogin,
    logOut,
    profileUpdate,
    loader,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
