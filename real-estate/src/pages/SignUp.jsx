import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function SignUp() {
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
    await Axios.post("/api/auth/sign-up", formData)
      .then((res) => {
        console.log(res.data);
        setError(null);
        navigate("/sign-in");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7 *:">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <input
          required
          type="text"
          placeholder="Username"
          id="username"
          className="border shadow-md p-3  rounded-lg "
          onChange={handleChange}
        />
        <input
          required
          type="email"
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
          {loading ? "Processing..." : "Sign Up"}
        </button>
      </form>
      <div className="flex  gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 ">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
