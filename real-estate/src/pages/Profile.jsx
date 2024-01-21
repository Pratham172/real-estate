import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import Axios from "axios";
import {Link} from 'react-router-dom';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setChangesMade(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    await Axios.post(`/api/user/update/${currentUser._id}`, formData)
      .then((res) => {
        dispatch(updateUserSuccess(res.data));
        if (!changesMade) {
          alert("No changes are made");
        } else {
          alert("Update Successful");
        }
      })
      .catch((error) => {
        dispatch(updateUserFailure(error.response.data.message));
      });
  };

  const handleDeleteAccount = async () => {
    dispatch(deleteUserStart());
    await Axios.delete(`/api/user/delete/${currentUser._id}`)
      .then((res) => {
        dispatch(deleteUserSuccess());
      })
      .catch((error) => {
        dispatch(deleteUserFailure(error.response.data.message));
      });
  };

  const handleSignOut = async () => {
    dispatch(signOutUserStart());
    await Axios.get("/api/auth/sign-out")
      .then((res) => {
        dispatch(signOutUserSuccess());
      })
      .catch((error) => {
        dispatch(signOutUserFailure(error.response.data.message));
      });
  };
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            id=""
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            id="username"
            className="border p-3 rounded-lg shadow-md"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            id="email"
            className="border p-3 rounded-lg shadow-md"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border p-3
             rounded-lg shadow-md"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-[#00ABE4] text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Processing..." : "update"}
          </button>
          <Link className="bg-green-500 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-listing"}>
                create listing
          </Link>
        </form>

        <form>
          <div className="flex justify-between mt-5">
            <span
              onClick={handleDeleteAccount}
              className="text-red-500 font-bold cursor-pointer"
            >
              Delete Account
            </span>
            <span
              onClick={handleSignOut}
              className="text-red-500 font-bold cursor-pointer"
            >
              Sign Out
            </span>
          </div>
          <p className="text-red-700">{error ? error : " "}</p>
        </form>
      </div>
    </div>
  );
}
