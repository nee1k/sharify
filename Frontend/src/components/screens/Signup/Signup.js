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
  const [accountType, setAccountType] = useState("public");

  const postData = () => {
    if (
      !name ||
      !email ||
      !password ||
      !location ||
      !confirmPassowrd ||
      !securityQuestion ||
      !securityAnswer ||
      !accountType
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
        location,
        securityQuestion,
        securityAnswer,
        accountType
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
        <p>
          <label>
            <input
              name="accountType"
              type="radio"
              value="public"
              checked={accountType === "public"}
              onChange={() => setAccountType("public")}
            />
            <span>Public</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name="accountType"
              type="radio"
              value="private"
              checked={accountType === "private"}
              onChange={() => setAccountType("private")}
            />
            <span>Private</span>
          </label>
        </p>
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
        <button className="signInButton" onClick={() => postData()}>
          Sign up
        </button>
      </div>
      </div>
    </div>
  );
};

export default Signup;
