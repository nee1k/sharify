import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";
import "./Profile.css";
import SERVER_URL from "../../constants/constants";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("jwt"));
    fetch(`${SERVER_URL}/myposts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.myposts);
      });
  }, []);

  //   useEffect(() => {
  //     if (image) {
  //       const data = new FormData();
  //       data.append("file", image);
  //       data.append("upload_preset", "insta-clone");
  //       data.append("cloud_name", "cnq");
  //       fetch("https://api.cloudinary.com/v1_1/cnq/image/upload", {
  //         method: "post",
  //         body: data,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           fetch("/updatepic", {
  //             method: "put",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: "Bearer " + localStorage.getItem("jwt"),
  //             },
  //             body: JSON.stringify({
  //               pic: data.url,
  //             }),
  //           })
  //             .then((res) => res.json())
  //             .then((result) => {
  //               console.log(result);
  //               localStorage.setItem(
  //                 "user",
  //                 JSON.stringify({ ...state, pic: result.pic })
  //               );
  //               dispatch({ type: "UPDATEPIC", payload: result.pic });
  //               //window.location.reload()
  //             });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
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
                  JSON.parse(localStorage.getItem("user")).profilePictureUrl
                    ? JSON.parse(localStorage.getItem("user")).profilePictureUrl
                    : "https://cdn-icons-png.flaticon.com/512/21/21104.png"
                }
              />
            </div>
            <div className="user-details">
              {/* <h4>{state?state.name:"loading"}</h4>
               */}
              <h5>{JSON.parse(localStorage.getItem("user"))?.name}</h5>
              {/* <h5>{state?state.email:"loading"}</h5>
               */}
              <h6>
                {JSON.parse(localStorage.getItem("user")).hideEmail === "true"
                  ? ""
                  : JSON.parse(localStorage.getItem("user")).email}
              </h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                {/* <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6> */}
                <h6>{mypics?.length} Posts</h6>
                <h6>
                  {JSON.parse(localStorage.getItem("user"))?.followers.length}{" "}
                  Followers
                </h6>
                <h6>
                  {JSON.parse(localStorage.getItem("user"))?.following.length}{" "}
                  Following
                </h6>
              </div>
            </div>
          </div>
          <button
            className="editProfileButton"
            onClick={() => {
              window.location.href = "/editprofile";
            }}
          >
            Edit Profile
          </button>
        </div>

        <div className="gallery">
          {mypics.map((item) => {
            return (
              <img
                key={item._id}
                className="item"
                src={item.albumCoverUrl}
                alt={item.songName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
