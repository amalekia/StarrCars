import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../auth/auth-provider";
import FullScreenSpinner from "../components/fullscreen-spinner";
import "../styles/userPosts.css";

const UserCarPosts = () => {
  const [carPosts, setCarPosts] = useState([]);
  const { user, loading } = useAuth();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchUserCarPosts = useCallback(async () => {
    if (!user || !user._id) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/cars/user-car-posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userId: user._id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user car posts.");
      }

      const data = await response.json();
      setCarPosts(data);
    } catch (error) {
      console.error("Error fetching user car posts:", error);
    }
  }, [user]);

  const handleDelete = (carId) => {
    if (window.confirm("Are you sure you want to delete this car post?")) {
      setDeleteLoading(true);
      fetch(`${process.env.REACT_APP_SERVER_URL}/cars/${carId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .then(() => {
          fetchUserCarPosts();
          setDeleteLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setDeleteLoading(false);
        });
    }
  };

  useEffect(() => {
    if (!loading && user) {
      fetchUserCarPosts();
    }
  }, [user, loading, fetchUserCarPosts]);

  if (deleteLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <div className="user-car-posts">
        <h1 className="user-car-posts-title">Your Car Posts</h1>
        <div className="user-car-posts-container">
        {carPosts.length > 0 ? (
            carPosts.map((post) => (
            <div key={post._id} className="car-card">
                <div className="car-card-image-container">
                {post.images && (
                    <img
                    src={post.images[0]}
                    alt={`${post.make} ${post.model}`}
                    className="car-card-image"
                    />
                )}
                </div>
                <div className="car-card-content">
                <h2 className="car-card-title">
                    {post.year} {post.carMake} {post.carModel}
                </h2>
                <p className="text-gray-600 mt-1">
                    Mileage: {post.mileage.toLocaleString()} miles
                </p>
                <p className="car-card-description">{post.description}</p>
                <button
                    className="delete-button"
                    onClick={() => handleDelete(post._id)}
                >
                    Delete Post
                </button>
                </div>
            </div>
            ))
        ) : (
            <p className="text-center text-gray-500 col-span-full">
            No car posts available.
            </p>
        )}
        </div>
    </div>
  );
};

export default UserCarPosts;
