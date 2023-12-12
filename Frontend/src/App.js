import React, { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./components/layouts/Navbar/navbar";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import About from "./components/screens/About/About";
import Home from "./components/screens/Home/Home";
import Login from "./components/screens/Signin/Signin";
import Signup from "./components/screens/Signup/Signup";
import Profile from "./components/screens/Profile/Profile";
import Chat from "./components/screens/Chat/Chat";
import SecurityQuestion from "./components/screens/SecurityQuestion/SecurityQuestion";
import NewPassword from "./components/screens/NewPassword/NewPassword";
import { reducer, initialState } from "./reducers/userReducer";
import PrivateRoute from "./components/routes/PrivateRoute";
import AuthRoute from "./components/routes/AuthRoute";
import CreatePost from "./components/screens/CreatePost/CreatePost";
import EditProfile from "./components/screens/EditProfile/EditProfile";
import UserProfile from "./components/screens/UserProfile.js/UserProfile";

export const UserContext = createContext();

// const ProtectedRoute = ({ user, children }) => {
//   const navigate = useNavigate();
//   if (!user) {
//     navigate("/signin");
//   }
//   return children;
// };

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/about"
        element={
          <AuthRoute>
            <About />
          </AuthRoute>
        }
      />

      <Route
        path="/signin"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute>
            <Signup />
          </AuthRoute>
        }
      />
      <Route
        exact
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route
        path="/securityquestion"
        element={
          <AuthRoute>
            <SecurityQuestion />
          </AuthRoute>
        }
      />
      <Route
        path="/newpassword/:token"
        element={
          <AuthRoute>
            <NewPassword />
          </AuthRoute>
        }
      />
      <Route
        path="/createpost"
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        }
      />
      <Route
        path="/editprofile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/:userid"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Define a style object to set the background color to blue
  const appStyle = {
    background: "rgb(11, 14, 48)",
    backgroundImage:
      "linear-gradient(143deg, rgba(11, 14, 48, 1) 30%, rgba(0, 138, 215, 1) 63%)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        {/* Apply the appStyle to set the background color */}
        <div style={appStyle}>
          <NavBar />
          <Routing />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
