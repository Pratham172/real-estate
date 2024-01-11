import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-400 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-violet-300-200">Skyline</span>
            <span className="text-white">Heaven</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex justify-between items-center w-24.5 sm:w-64  ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4 text-white font-bold">
          <Link to={"/"}>
            <li className="hidden sm:inline tex-slate-700 hover:underline hover:shadow-lg">
              Home
            </li>
          </Link>

          <Link to={"/about"}>
            <li className="hidden sm:inline mx-10 tex-slate-700 hover:underline hover:shadow-lg">
              About
            </li>
          </Link>

          <Link to={"/sign-in"}>
            <li className=" tex-slate-700 hover:underline hover:shadow-lg">SignIn</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
