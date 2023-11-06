import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);
  const navigate = useNavigate();

  const dummyImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("task-token");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="navbar bg-base-300 xl:px-64">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            {user?.uid ? (
              <li onClick={handleLogOut}>
                <a>Sign Out</a>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl ">
          Task Management System
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          {user?.uid ? (
            <li onClick={handleLogOut}>
              <a>Sign Out</a>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
        <label
          className="btn btn-ghost btn-circle avatar tooltip  tooltip-right"
          data-tip={user ? user?.displayName : "Please Log in"}
        >
          <div className="w-10 rounded-full ">
            <img src={user ? user?.photoURL : dummyImage} />
          </div>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
