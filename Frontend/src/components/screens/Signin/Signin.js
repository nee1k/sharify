import "./Signin.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import M from "materialize-css";
import { UserContext } from "../../../App";
import NavBar from "../../layouts/Navbar/navbar";
import SERVER_URL from "../../constants/constants";

const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    if (!email || !password) {
      M.toast({
        html: "Please fill all the fields",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch(`${SERVER_URL}/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
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
          localStorage.setItem("jwt", data.token);
          console.log(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "Signed in successfully",
            classes: "#43a047 green darken-1",
          });
          window.location.href = "/";
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
          <h3 className="text-white"> Sign In </h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signInButton" onClick={() => postData()}>
            Sign In
          </button>
          <div
            className="endText"
            onClick={() => {
              window.location.href = "/securityquestion";
            }}
          >
            Forgot Password
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
