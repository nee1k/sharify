import "./NewPassword.css";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from "materialize-css";
import SERVER_URL from "../../constants/constants";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const resetToken = useParams().token;

  const postData = () => {
    if (!newPassword || !confirmPassowrd) {
      M.toast({
        html: "Please fill all the fields",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    if (newPassword !== confirmPassowrd) {
      M.toast({
        html: "Passwords don't match",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch(`${SERVER_URL}/new-password`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword,
        resetToken,
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
            html: "Password Reset Successfully",
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
      <div className="card auth-card input-field">
        <h3> New Password</h3>
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassowrd}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="signInButton" onClick={() => postData()}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
