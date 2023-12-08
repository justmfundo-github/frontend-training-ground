import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfilePosts() {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source(); // Use cancel token to avoid async request returning to a
    //component that is no longer relevant, Ie. When a user clicks away from a page while it was still waiting
    //on an async response

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { CancelToken: ourRequest.token });
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem fetching posts..." + e);
      }
    }
    fetchPosts();
    return () => {
      ourRequest.cancel;
    };
  }, []);

  if (isLoading) {
    return <LoadingDotsIcon />;
  } else {
    return (
      <div className="list-group">
        {posts.map((post) => {
          const date = new Date(post.createdDate);
          const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
          return (
            <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong> <span className="text-muted small">on {dateFormatted} </span>
            </Link>
          );
        })}
      </div>
    );
  }
}
export default ProfilePosts;
