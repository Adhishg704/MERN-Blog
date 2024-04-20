import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(' ');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `https://insightx-blog.onrender.com/api/user/getusers?limit=9&isAdmin=${currentUser.isAdmin}`, {
            method: "GET"
          }
        );
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
          if(data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);


  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `https://insightx-blog.onrender.com/api/user/getusers?limit=9&isAdmin=${currentUser.isAdmin}&startIndex=${startIndex}`, {
            method: "GET"
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data]);
        if (data.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  

  const handleDeleteUser = async () => {
    setShowModal(false);
    const res = await fetch(
        `https://insightx-blog.onrender.com/api/user/delete/${userIdToBeDeleted}`, {
            method: "DELETE"
        }
    );
    const data = await res.json();
    if(!res.ok) {
        console.log(data.message);
    }
    else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToBeDeleted));
    }
  }


  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {user.username}
                  </Table.Cell>
                  <Table.Cell>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>
                    {
                        user.isAdmin? (
                            <TiTick className="text-teal-500 font-semibold"></TiTick>
                        ): (
                            <RxCross2 className="text-red-500 font-semibold"></RxCross2>
                        )
                    }
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToBeDeleted(user._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>There are no users registered!</p>
      )}
      <Modal show={showModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 mx-auto text-gray-400" />
            <span className="text-lg text-gray-400">
              Are you sure you want to delete this user?
            </span>
            <div className="flex gap-4 justify-center">
              <Button color="failure" className="mt-4" onClick={handleDeleteUser}>
                Yes, I am sure
              </Button>
              <Button
                color="success"
                className="mt-4"
                onClick={() => {
                  setShowModal(false);
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