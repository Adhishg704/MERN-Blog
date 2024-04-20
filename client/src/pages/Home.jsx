import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/post/getposts?limit=6", {
          method: "GET",
        });
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div className="p-28">
      <div className="mt-5 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to
          <span className="m-2 p-8 text-yellow-50 font-bold p-2 bg-gradient-to-tr from-purple-500 to-pink-300 via-purple-500">
            InsightX
          </span>
          Blog
        </h1>
        <p className="text-sm m-10">
          Welcome to our diverse collection of articles and tutorials covering a
          wide range of topics in the realms of JavaScript, Python, Machine
          Learning, Cloud computing, databases, and Security. Whether you're
          delving into the intricacies of web development, exploring the depths
          of software engineering, or immersing yourself in the nuances of
          programming languages, you'll find a wealth of resources here to fuel
          your curiosity and advance your skills. Join us as we navigate through
          the ever-evolving landscape of technology, offering insights,
          guidance, and practical know-how to help you thrive in today's dynamic
          digital world.
        </p>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          {posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">
                Recent Posts
              </h2>
              <div className="flex flex-wrap gap-4 ml-10">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                to={"/search"}
                className="text-lg text-teal-500 hover:underline text-center"
              >
                View all posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

