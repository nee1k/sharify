import "./Signup.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import SERVER_URL from "../../constants/constants";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [accountType, setAccountType] = useState("private");
  const [isPrivate, setIsPrivate] = useState(true);

  const handleToggleSwitch = () => {
    setIsPrivate(!isPrivate);
  };

  const postData = () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassowrd ||
      !securityQuestion ||
      !securityAnswer
    ) {
      M.toast({
        html: "Please fill all the fields",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    if (password !== confirmPassowrd) {
      M.toast({
        html: "Passwords don't match",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch(`${SERVER_URL}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        securityQuestion,
        securityAnswer,
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
          window.location.href = "/signin";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <div className="cardcss">
      <div className="card auth-card input-field">
        <h3 className="text-white"> Sign Up</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassowrd}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="input-field col s12">
          <div className="label">Account Type</div>
          <select
            class="browser-default"
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            <option value="Private">
              Private
            </option>
            <option value="Public">
              Public
            </option>
          </select>
        </div>

        <div className="input-field col s12">
          <div className="label">Security Question</div>
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
          placeholder="Security Question Answer"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />
        
        {/* <div className="input-field col s12">
            <div className="label">Account Type</div>
            <label className="switch">
              <input
                type="checkbox"
                onChange={handleToggleSwitch}
                checked={isPrivate}
              />
              <span className="slider round"></span>
            </label>
            <span className="account-type-label">
              {isPrivate ? "Private" : "Public"} Account
            </span>
          </div> */}

        <button className="signInButton" onClick={() => postData()}>
          Sign up
        </button>
      </div>
      </div>
    </div>
  );
};

export default Signup;
