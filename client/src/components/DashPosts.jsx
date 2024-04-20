import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setuserPosts] = useState({});

  console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/post/getposts?userId=${currentUser._id}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setuserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post._id}>
                <Table.Row className="bg-white">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-12 h-12 object-cover"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-900" to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="text-red-500 font-medium cursor-pointer hover:underline">Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                      <span className="text-teal-500 hover:underline">Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
}
