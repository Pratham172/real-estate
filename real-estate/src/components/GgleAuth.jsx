import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function GgleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuthentication = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      await Axios.post("api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }).then((res) => {
        dispatch(signInSuccess(res.data));
        navigate('/')
      });
    } catch (error) {
      console.log("could not sign in with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleAuthentication}
      type="button"
      className="bg-red-600 p-3 hover:shadow-lg font-extrabold rounded-lg text-white   hover:opacity-85 disabled:opacity-80 uppercase"
    >
      continue with google
    </button>
  );
}
