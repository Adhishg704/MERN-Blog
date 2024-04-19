import { Button, TextInput, Modal, Alert } from "flowbite-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [updateMsg, setUpdateMsg] = useState("");
  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const response = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        dispatch(updateFailure({ errors: "Update failed" }));
      } else {
        console.log(data);
        dispatch(updateSuccess(data));
        setUpdateMsg("Updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure({ errors: "Update failed" }));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setModal(false);
    try {
      dispatch(deleteStart);
      const response = await fetch(
        `http://localhost:3000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        dispatch(deleteFailure({ errors: "Error in deleting user" }));
      } else {
        dispatch(deleteSuccess());
      }
    } catch (error) {
      dispatch(deleteFailure({ errors: "Error in deleting user" }));
    }
  };

  const handleSignout = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/signout", {
        method: "POST",
      });
      if (response.ok) {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex flex-col max-w-lg gap-4">
      <h1 className="text-3xl my-7 font-semibold text-center">Profile</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update
        </Button>
        {currentUser.isAdmin && (
          <div>
            <Link to="/create-post">
              <Button
                type="button"
                className="w-full"
                gradientDuoTone="purpleToPink"
              >
                Create a post
              </Button>
            </Link>
          </div>
        )}
      </form>
      <div>
        <span className="text-green-500">{updateMsg}</span>
      </div>
      <div className="flex justify-between">
        <span
          onClick={() => {
            setModal(true);
          }}
          className="text-red-500 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-red-500 cursor-pointer">
          Sign out
        </span>
      </div>
      <Modal show={modal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 mx-auto text-gray-400" />
            <span className="text-lg text-gray-400">
              Are you sure you want to delete this account?
            </span>
            <div className="flex gap-4 justify-center">
              <Button color="failure" className="mt-4" onClick={handleDelete}>
                Yes, I am sure
              </Button>
              <Button
                color="success"
                className="mt-4"
                onClick={() => {
                  setModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
