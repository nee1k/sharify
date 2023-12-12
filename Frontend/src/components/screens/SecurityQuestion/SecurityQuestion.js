import { useEffect, useState } from "react";
import "./SecurityQuestion.css";
import M from "materialize-css";
import SERVER_URL from "../../constants/constants";

const SecurityQuestion = () => {
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [email, setEmail] = useState("");

  const getSecurityQuestion = () => {
    if (!email) {
      M.toast({
        html: "Please fill your email",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch(`${SERVER_URL}/security-question`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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
            html: "Successfully retrieved security question",
            classes: "#43a047 green darken-1",
          });
          setSecurityQuestion(data.securityQuestion);
        }
      });
  };

  const sendSecurityAnswer = () => {
    if (!securityAnswer) {
      M.toast({
        html: "Please fill the security answer",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch(`${SERVER_URL}/reset-password-question`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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
            html: "Security answer is correct",
            classes: "#43a047 green darken-1",
          });
          window.location.href = "/newpassword/" + data.resetToken;
        }
      });
  };

  const sendPasswordEmail = () => {
    if (!email) {
      M.toast({
        html: "Please fill your email",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch(`${SERVER_URL}/reset-password`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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
            html: "Check your email",
            classes: "#43a047 green darken-1",
          });
        }
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h5> Password Recovery </h5>
        <div className="label">
          Please enter your email to retrieve your security question
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="signInButton" onClick={() => getSecurityQuestion()}>
          Retrieve Question
        </button>
        <div className="label">Security Question: {securityQuestion}</div>
        <input
          type="password"
          placeholder="Security Answer"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />
        <button className="signInButton" onClick={() => sendSecurityAnswer()}>
          Submit
        </button>
        <div className="endText" onClick={() => sendPasswordEmail()}>
          Dont remember security answer?
        </div>
      </div>
    </div>
  );
};

export default SecurityQuestion;
