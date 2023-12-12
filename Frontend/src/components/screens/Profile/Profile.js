import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";
import "./Profile.css";
import SERVER_URL from "../../constants/constants";

const Profile = () => {
  const [user, setUser] = useState({});
  const [followButtonVisible, setFollowButtonVisible] = useState(false);
  const { state } = useContext(UserContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/user/:id`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const result = await response.json();
        setUser(result.user);
        setFollowButtonVisible(result.isCurrentUser || !result.isFollowing);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleFollow = () => {
    fetch(`${SERVER_URL}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: user._id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Follow request sent successfully:", result);
        // Update state or UI as needed
      })
      .catch((error) => {
        console.error("Error sending follow request:", error);
      });
  };

  return (
    <div className="container">
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "2px solid lightgrey",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "80px",
              }}
              src={
                user.profilePictureUrl ||
                "https://cdn-icons-png.flaticon.com/512/21/21104.png"
              }
              alt="profile"
            />
          </div>
          <div className="user-details">
            <h5>{user.name}</h5>
            <h6>
              {user.hideEmail === "true" ? "" : user.email}
            </h6>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>{user.followers && user.followers.length ? `${user.followers.length} Followers` : '0 Followers'}</h6>
              <h6>{user.following && user.following.length ? `${user.following.length} Following` : '0 Following'}</h6>
            </div>
          </div>
        </div>
        {followButtonVisible && (
          <button className="followButton" onClick={handleFollow}>
            Follow
          </button>
        )}
      </div>

      <div style={{ maxWidth: "550px", margin: "0px auto" }}>
        <div className="gallery">
          {user.posts &&
            user.posts.map((item) => (
              <img
                key={item._id}
                className="item"
                src={item.albumCoverUrl}
                alt={item.songName}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
