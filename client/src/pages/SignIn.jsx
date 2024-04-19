import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {

  const [formData, setFormdata] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    dispatch(signInStart());
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.errors) {
        setErrorMsg(data.errors[0].msg);
      }
      if(response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    }
    catch(err) {
      dispatch(signInFailure(err));
      console.log(err);
    }
  }

  return (
    <div className="m-20 min-h-screen">
      <div className="inline-flex sm:flex-col md:flex-row md:items-center gap-4">
        <div className="mx-auto max-w-3xl flex-1">
          <Link className="text-4xl" to="/">
            <span className="mr-2 text-yellow-50 font-bold p-2 bg-gradient-to-tr from-purple-500 to-pink-300 via-purple-500">
              InsightX
            </span>
            Blog
          </Link>
          <p className="mt-3 text-sm flex-1">
            Welcome to InsightX Blog, where we unravel industry insights and
            explore emerging trends to keep you informed and inspired. Join us
            on a journey of discovery and empowerment.
          </p>
        </div>
        <div className="max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="mt-2">
              <label htmlFor="email">Your email</label>
              <input type="email" className="rounded-b border-cyan-100 block w-64" id="email" placeholder="Enter email" onChange={handleChange} />
            </div>
            <div className="mt-2">
              <label htmlFor="password">Your password</label>
              <input type="password" className="rounded-b border-cyan-100 block w-64" id="password" placeholder="Enter password" onChange={handleChange}/>
            </div>
            <div className="text-red-700 mt-3">
              {errorMsg}
            </div>
            <button type="submit" className="btn bg-gradient-to-tr from-purple-100 to-pink-500 via-purple-300 mt-2 w-64 text-yellow-50 hover:text-yellow-100 focus:text-yellow-100">Sign in</button>
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span>Do not have an account?</span>
            <Link className="text-blue-500" to = "/sign-up">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
