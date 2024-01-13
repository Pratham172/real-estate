import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function SignIn() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await Axios.post("/api/auth/sign-in", formData)
      .then((res) => {
        console.log(res.data);
        setError(null);
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7 *:">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <input
          required
          type="text"
          placeholder="Email"
          id="email"
          className="border shadow-md p-3  rounded-lg "
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="Password"
          id="password"
          className="border p-3 shadow-md rounded-lg "
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-[#00ABE4] p-3 hover:shadow-lg font-extrabold rounded-lg text-white   hover:opacity-80 disabled:opacity-80 uppercase"
        >
          {loading ? "Processing..." : "Sign in"}
        </button>
      </form>
      <div className="flex  gap-2 mt-5">
        <p>Dont have an account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 ">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
