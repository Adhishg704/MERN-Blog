import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [updateMsg, setUpdateMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const response = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(updateFailure({ errors: "Update failed" }));
      }
      else {
        console.log(data);
        dispatch(updateSuccess(data));
        setUpdateMsg("Updated successfully");
      }
    }
    catch (err) {
      dispatch(updateFailure({ errors: "Update failed" }));
    }
  }

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
        <TextInput type="text" id="email" defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type="password" id="password" placeholder="password" onChange={handleChange} />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update
        </Button>
      </form>
      <div>
        <span className="text-green-200">{updateMsg}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-red-500 cursor-pointer mt-3">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
