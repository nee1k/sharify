import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";
import "./UserProfile.css";
import SERVER_URL from "../../constants/constants";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const { userid } = useParams();

  useEffect(() => {
    fetch(`${SERVER_URL}/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch(`${SERVER_URL}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, data._id],
          },
        }));
      })
      .catch((error) => console.error("Error following user:", error));
  };
  
  const unfollowUser = () => {
    fetch(`${SERVER_URL}/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            followers: prevState.user.followers.filter(
              (item) => item !== data._id
            ),
          },
        }));
      })
      .catch((error) => console.error("Error unfollowing user:", error));
  };

  
  // const followUser = () => {
  //   fetch(`${SERVER_URL}/follow`, {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },

  //     body: JSON.stringify({
  //       followId: userid,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       // dispatch({
  //       //   type: "UPDATE",
  //       //   payload: { following: data.following, followers: data.followers },
  //       // });
  //       localStorage.setItem("user", JSON.stringify(data));
  //       setProfile((prevState) => {
  //         return {
  //           ...prevState,
  //           user: {
  //             ...prevState.user,
  //             followers: [...prevState.user.followers, data._id],
  //           },
  //         };
  //       });
  //     });
  // };

  // const unfollowUser = () => {
  //   fetch(`${SERVER_URL}/unfollow`, {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },

  //     body: JSON.stringify({
  //       followId: userid,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       // dispatch({
  //       //   type: "UPDATE",
  //       //   payload: { following: data.following, followers: data.followers },
  //       // });
  //       localStorage.setItem("user", JSON.stringify(data));
  //       setProfile((prevState) => {
  //         const newFollower = prevState.user.followers.filter(
  //           (item) => item != data._id
  //         );
  //         return {
  //           ...prevState,
  //           user: {
  //             ...prevState.user,
  //             followers: newFollower,
  //           },
  //         };
  //       });
  //     });
  // };

  return (
    <>
      {userProfile ? (
        <div className="container">
          <div style={{ maxWidth: "550px", margin: "0px auto" }}>
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
                    //    src={state?state.pic:"loading"}
                    src={
                      userProfile.user.profilePictureUrl
                        ? userProfile.user.profilePictureUrl
                        : "https://cdn-icons-png.flaticon.com/512/21/21104.png"
                    }
                  />
                </div>
                <div className="user-details">
                  {/* <h4>{state?state.name:"loading"}</h4>
                   */}
                  <h5>{userProfile.user.name}</h5>
                  {/* <h5>{state?state.email:"loading"}</h5>
                   */}
                  {/* <h6>
                    {JSON.parse(localStorage.getItem("user")).hideEmail ===
                    "true"
                      ? ""
                      : JSON.parse(localStorage.getItem("user")).email}
                  </h6> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "108%",
                    }}
                  >
                    <h6>{userProfile.posts.length} Posts</h6>
                    <h6>{userProfile.user.followers ? userProfile.user.followers.length : 0} Followers</h6>
                    <h6>{userProfile.user.following ? userProfile.user.following.length : 0} Following</h6>
                  </div>
                  {userProfile.user.followers.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <button
                  className="editProfileButton"
                  onClick={() => unfollowUser()}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="editProfileButton"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              )}
                </div>
              </div>
            </div>

            <div className="gallery">
            {userProfile.user.accountType === 'Private' ? (
              userProfile.user.followers.includes(state._id) ? (
                userProfile.posts.map((item) => (
                  <img
                    key={item._id}
                    className="item"
                    src={item.albumCoverUrl}
                    alt={item.songName}
                  />
                ))
              ) : (
                <p className="follow-text">Private account. Follow to see posts.</p>
              )
            ) : (
              userProfile.posts.map((item) => (
                <img
                  key={item._id}
                  className="item"
                  src={item.albumCoverUrl}
                  alt={item.songName}
                />
              ))
            )}
          </div>

          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default UserProfile;
