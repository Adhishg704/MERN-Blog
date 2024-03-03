import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="mx-auto flex flex-col max-w-lg gap-4">
      <h1 className="text-3xl my-7 font-semibold text-center">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser.username}
        />
        <TextInput type="text" id="email" defaultValue={currentUser.email} />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update
        </Button>
      </form>
      <div className="flex justify-between">
          <span className="text-red-500 cursor-pointer">Delete Account</span>
          <span className="text-red-500 cursor-pointer">Sign out</span>
        </div>
    </div>
  );
}
