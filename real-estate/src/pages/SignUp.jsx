import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7 *:">Sign Up</h1>
      <form className="flex flex-col gap-8">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border shadow-md p-3  rounded-lg "
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="border shadow-md p-3  rounded-lg "
        />
        <input
          type="text"
          placeholder="Password"
          id="password"
          className="border p-3 shadow-md rounded-lg "
        />
        <button className="bg-[#00ABE4] p-3  font-extrabold rounded-lg text-white   hover:opacity-80 disabled:opacity-80 uppercase">
          Sign Up
        </button>
      </form>
      <div className="flex  gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 ">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
