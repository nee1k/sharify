import "./EditProfile.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import SERVER_URL from "../../constants/constants";

const EditProfile = () => {
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("user"))?.name
  );
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("user")).email
  );
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    JSON.parse(localStorage.getItem("user")).profilePictureUrl
  );
  const [hideEmail, setHideEmail] = useState(
    JSON.parse(localStorage.getItem("user")).hideEmail === "true"
  );
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const postDetails = () => {};

  const postData = async () => {
    if (password !== confirmPassword) {
      M.toast({
        html: "Passwords don't match",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "sharify");
      data.append("cloud_name", "sharify");
      fetch("https://api.cloudinary.com/v1_1/sharify/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log("hideEmail", hideEmail.toString());
          fetch(`${SERVER_URL}/edit-profile`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              name: name === null ? undefined : name,
              email: name === null ? undefined : email,
              profilePictureUrl: data.url,
              password: name === null ? undefined : password,
              securityQuestion: name === null ? undefined : securityQuestion,
              securityAnswer: name === null ? undefined : securityAnswer,
              hideEmail: hideEmail.toString(),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                M.toast({
                  html: data.error,
                  classes: "#c62828 red darken-3",
                });
              } else {
                M.toast({
                  html: data.message,
                  classes: "#43a047 green darken-1",
                });
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href = "/profile";
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`${SERVER_URL}/edit-profile`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          name: name === null ? undefined : name,
          email: name === null ? undefined : email,
          password: name === null ? undefined : password,
          securityQuestion: name === null ? undefined : securityQuestion,
          securityAnswer: name === null ? undefined : securityAnswer,
          hideEmail: hideEmail.toString(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({
              html: data.error,
              classes: "#c62828 red darken-3",
            });
          } else {
            M.toast({
              html: data.message,
              classes: "#43a047 green darken-1",
            });
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/profile";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updatePhoto = async (file) => {
    setImage(file);
    var reader = new FileReader();

    reader.onload = function (e) {
      setPreview(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const pickPhoto = () => {
    document.getElementById("file").click();
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h3 className="text-white"> Edit Profile</h3>
        <div>
          <img
            style={{ width: "100px", height: "100px", borderRadius: "80px" }}
            //    src={state?state.pic:"loading"}
            src={
              preview
                ? preview
                : profilePictureUrl
                ? profilePictureUrl
                : "https://cdn-icons-png.flaticon.com/512/21/21104.png"
            }
          />
        </div>
        <div></div>
        <button className="signInButton" onClick={(e) => pickPhoto()}>
          Update Photo
        </button>
        <input
          type="file"
          id="file"
          style={{ visibility: "hidden" }}
          onChange={(e) => updatePhoto(e.target.files[0])}
        />

        <div class="form-group">
          <label class="toggle-switch">
            <input
              class="toggle-switch-check"
              type="checkbox"
              checked={hideEmail}
              onChange={() => setHideEmail(!hideEmail)}
            />
            <span
              class="toggle-switch-label"
              style={{ color: "black", fontFamily: "Asap" }}
            >
              Hide Email
            </span>
            <span aria-hidden="true" class="toggle-switch-bar">
              <span
                class="toggle-switch-handle"
                data-label-off=""
                data-label-on="ON"
              ></span>
            </span>
          </label>
        </div>

        <input
          type="text"
          placeholder="New Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="input-field col s12">
          <div className="label">New Security Question</div>
          <select
            class="browser-default"
            onChange={(e) => setSecurityQuestion(e.target.value)}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            <option value="Your favourite artist/band of all time">
              Your favourite artist/band of all time
            </option>
            <option value="The first song you ever heard from your favourite artist/band">
              The first song you ever heard from your favourite artist/band
            </option>
            <option value="Your favourite album of all time">
              Your favourite album of all time
            </option>
          </select>
        </div>
        <input
          type="text"
          placeholder="New Security Question Answer"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />
        <button className="signInButton" onClick={() => postData()}>
          Edit Profile
        </button>
      </div>
    </div>
    // <div className="mycard">
    //   <div className="card auth-card input-field">
    //     <h3> Sign Up</h3>
    //     <input
    //       type="text"
    //       placeholder="Name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Confirm Password"
    //       value={confirmPassword}
    //       onChange={(e) => setConfirmPassword(e.target.value)}
    //     />
    //     <div className="input-field col s12">
    //       <div className="label">Security Question</div>
    //       <select
    //         class="browser-default"
    //         onChange={(e) => setSecurityQuestion(e.target.value)}
    //       >
    //         <option value="" disabled selected>
    //           Choose your option
    //         </option>
    //         <option value="Your favourite artist/band of all time">
    //           Your favourite artist/band of all time
    //         </option>
    //         <option value="The first song you ever heard from your favourite artist/band">
    //           The first song you ever heard from your favourite artist/band
    //         </option>
    //         <option value="Your favourite album of all time">
    //           Your favourite album of all time
    //         </option>
    //       </select>
    //     </div>
    //     <input
    //       type="text"
    //       placeholder="Security Question Answer"
    //       value={securityAnswer}
    //       onChange={(e) => setSecurityAnswer(e.target.value)}
    //     />
    //     <button className="signInButton" onClick={() => postData()}>
    //       Sign up
    //     </button>
    //   </div>
    // </div>
  );
};

export default EditProfile;
