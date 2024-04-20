import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "flowbite-react";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async (e) => {
    try {
      const response = await fetch("https://insightx-blog.onrender.com/api/user/signout", {
        method: "POST",
      });
      if (response.ok) {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark pl-3 pr-3">
        <Link className="navbar-brand" to="/">
          <span className="mr-2 font-semibold p-2 bg-gradient-to-tr from-purple-500 to-pink-300 via-purple-500">
            InsightX
          </span>
          Blog
        </Link>
        <div className="ml-5">
          <form className="form-inline d-flex mr-auto" onSubmit={handleSubmit}>
            <input
              className="form-control mr-sm-2"
              type="search"
              value={searchTerm}
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <AiOutlineSearch color="white" className="mt-3" />
          </form>
        </div>

        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item p-3">
              <Link
                className="nav-link text-yellow-50 hover:text-yellow-100 focus:text-yellow-100"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item p-3">
              <Link
                className="nav-link text-yellow-50 hover:text-yellow-100 focus:text-yellow-100"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item p-3">
              {currentUser ? (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<Avatar alt={currentUser.username} rounded></Avatar>}
                >
                  <DropdownHeader>
                    <span className="text-sm block">
                      @{currentUser.username}
                    </span>
                    <span className="text-sm block font-medium truncate">
                      {currentUser.email}
                    </span>
                  </DropdownHeader>
                  <Link to="/dashboard?tab=profile">
                    <DropdownItem>Profile</DropdownItem>
                  </Link>
                  <DropdownDivider />
                  <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
                </Dropdown>
              ) : (
                <Link
                  className="nav-link text-yellow-50 hover:text-yellow-100 focus:text-yellow-100 btn bg-gradient-to-tr from-blue-100 to-purple-300 via-purple-300="
                  to="/sign-in"
                >
                  Sign in
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
