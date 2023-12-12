import React, { useState, useEffect } from "react";
import "./Home.css";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add this line to import axios
import SERVER_URL from "../../constants/constants";
import { Link } from "react-router-dom";

// Import the CreatePost component
import CreatePost from "../CreatePost/CreatePost.js";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [state, setState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("test")
        console.log(result);
        setData(result.posts);
      });
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [likes, setLikes] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [toggleComment, setToggleComment] = useState(false);

  const handleLikeToggle = (postId, isLiked) => {
    if (isLiked) {
      // If the post is currently liked, unlike it
      handleUnlike(postId);
    } else {
      // If the post is not liked, like it
      handleLike(postId);
    }
  };

  const handleLike = (postId) => {
    fetch(`${SERVER_URL}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlike = (postId) => {
    fetch(`${SERVER_URL}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    console.log(text, postId);
    fetch(`${SERVER_URL}/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        setToggleComment(!toggleComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const followUser = (id) => {
    fetch(`${SERVER_URL}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },

      body: JSON.stringify({
        followId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      });
  };

  // const handleShare = (postId) => {
  //   console.log(`Shared post with ID: ${postId}`);
  // };

  useEffect(() => {
    if (localStorage.getItem("jwt") != null) {
      fetch(`${SERVER_URL}/followposts`, {
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result.posts);
          var activityResult = [];
          var lookup = {};
          for (var item, i = 0; (item = result.posts[i++]); ) {
            var id = item.postedBy._id;

            if (!(id in lookup)) {
              lookup[id] = 1;
              activityResult.push(item);
            }
          }
          setActivityData(activityResult);
          // Store the like counts for each post
          const counts = {};
          result.posts.forEach((post) => {
            counts[post._id] = post.likes.length;
          });
          setLikeCounts(counts);
          fetch(`${SERVER_URL}/recommended-users`, {
            method: "get",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }).then((res) => {
            res.json().then((result) => {
              setRecommendedUsers(result.users);
            });
          });
        });
    }
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter posts based on the search query
    const filteredPosts = data.filter(
      (post) =>
        post.caption.toLowerCase().includes(query) ||
        post.artistName.toLowerCase().includes(query) ||
        post.albumName.toLowerCase().includes(query)
    );

    setFilteredData(filteredPosts);
  };

  return (
    <div className="home-container">
      <div className="user-profile">
        <h5 className="user-name" align="center">
          Recommended<br></br>Users
        </h5>
        {recommendedUsers.map((item) => {
          return (
            <div className="activity-tile">
              <img
                className="activity-user-photo"
                style={{ width: "70px", height: "70px", borderRadius: "35px" }}
                src={
                  item.profilePictureUrl
                    ? item.profilePictureUrl
                    : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="User 1"
              />
              <div>
                <Link to={"/profile/" + item._id}>
                  <h4
                    className="activity-user-name"
                    style={{
                      textAlign: "center",
                      fontFamily: "Merienda, cursive",
                      fontSize: "14px",
                      color: "white",
                    }}
                  >
                    {item.name}
                  </h4>
                </Link>
                <button
                  className="follow-button"
                  onClick={() => {
                    followUser(item._id);
                  }}
                >
                  Follow
                </button>
              </div>
            </div>
          );
        })}
        {/* <img
          style={{ width: "200px", height: "200px", borderRadius: "100px" }}
          className="user-photo"
          src={
            JSON.parse(localStorage.getItem("user"))
              ? JSON.parse(localStorage.getItem("user")).profilePictureUrl
              : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          alt="User Photo"
        />
        <h3 className="user-name">
          {JSON.parse(localStorage.getItem("user"))?.name}
        </h3>
        <div className="activity-status">
          <p>Active now</p>
        </div> */}
      </div>

      <div className="posts">
        {/* <div className="new-post"> */}

        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div> */}

        <CreatePost />
        {/* </div> */}
        <div className="post-feed">
          {data.map((item) => {
            const likeCount = likeCounts[item._id] || 0; // Get the like count for the current post
            return (
              <div className="post">
                <div className="post-header">
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "35px",
                    }}
                    className="post-user-photo"
                    src={
                      item.postedBy.profilePictureUrl
                        ? item.postedBy.profilePictureUrl
                        : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    alt="User 1"
                  />
                  <Link
                    to={
                      item.postedBy._id !=
                      JSON.parse(localStorage.getItem("user"))?._id
                        ? "/profile/" + item.postedBy?._id
                        : "/profile"
                    }
                  >
                    <h4 className="post-user-name">{item.postedBy?.name}</h4>
                  </Link>
                </div>
                <div className="post-details">
                  <div className="post-song-name">{item.songName}</div>
                  <div className="post-song-details">
                    <p className="post-song-artist">{item.artistName} </p>
                    <p className="post-song-album">
                      &nbsp;&#8226;&nbsp;{item.albumName}
                    </p>
                  </div>
                </div>
                <a href={item.spotifyUrl} target="_blank">
                  <img
                    className="post-album-art"
                    src={item.albumCoverUrl}
                    alt="User 1"
                  />
                </a>
                <p className="post-caption">{item.caption}</p>
                <div className="post-actions">
                  {/* // toggle unlike and like */}
                  <button
                    className={`post-action ${
                      item.likes.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                      )
                        ? "liked"
                        : "unliked"
                    }`}
                    onClick={() =>
                      handleLikeToggle(
                        item._id,
                        item.likes.includes(
                          JSON.parse(localStorage.getItem("user"))._id
                        )
                      )
                    }
                  >
                    <i className="material-icons">favorite</i>
                  </button>

                  <button
                    className="post-action comment"
                    onClick={() => setToggleComment(!toggleComment)}
                  >
                    <i className="material-icons">chat_bubble</i>
                  </button>
                  <button
                    className="post-action share"
                    // onClick={handleShare}
                  >
                    <i className="material-icons">share</i>
                  </button>
                </div>
                <div
                  className="post-info"
                  style={{ fontFamily: "Merienda, cursive" }}
                >
                  {item.likes.length} likes
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontFamily: "Merienda, cursive",
                    margin: "20px 0",
                  }}
                >
                  Comments
                </div>
                {item.comments.length != 0 ? (
                  item.comments.map((record) => {
                    return (
                      <div>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: "12px",
                            fontFamily: "Merienda, cursive",
                          }}
                        >
                          {record.postedBy.name}
                        </span>
                        <div style={{ marginBottom: "8px" }}>{record.text}</div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    style={{
                      marginBottom: "8px",
                      textAlign: "center",
                      fontFamily: "Merienda, cursive",
                    }}
                  >
                    No comments yet :(
                  </div>
                )}
                {toggleComment ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(e.target[0].value, item._id);
                    }}
                  >
                    <input
                      style={{ color: "White" }}
                      type="text"
                      placeholder="Add a comment..."
                    />
                  </form>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="activity-sidebar">
        <h3 className="user-name" align="center">
          Activity<br></br>Sidebar
        </h3>
        {activityData.map((item) => {
          return (
            <div className="activity-tile">
              <img
                className="activity-user-photo"
                style={{ width: "40px", height: "40px", borderRadius: "20px" }}
                src={
                  item.postedBy.profilePictureUrl
                    ? item.postedBy.profilePictureUrl
                    : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="User 1"
              />
              <div>
                <h4
                  className="activity-user-name"
                  style={{
                    textAlign: "center",
                    fontFamily: "Merienda, cursive",
                  }}
                >
                  {item.postedBy?.name}
                </h4>
                <p
                  className="activity-song"
                  style={{
                    textAlign: "center",
                    fontFamily: "Merienda, cursive",
                  }}
                >
                  Listening to: {item.songName} by {item.artistName}
                </p>
              </div>
            </div>
          );
        })}
        {/* <div className="activity-tile">
          <img
            className="activity-user-photo"
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="User 3"
          />
          <div>
            <h4 className="activity-user-name">Joy</h4>
            <p className="activity-song">Listening to: Perfect</p>
          </div>
        </div>
        <div className="activity-tile">
          <img
            className="activity-user-photo"
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="User 4"
          />
          <div>
            <h4 className="activity-user-name">Namith</h4>
            <p className="activity-song">Listening to: MONACO</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
