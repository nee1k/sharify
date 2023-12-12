import { useContext, useRef, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import "./Navbar.css";
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import SERVER_URL from "../../constants/constants";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const searchModal = useRef(null);
  const [search, setSearch] = useState('');
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    console.log("wdqwdqwd",userDetails)
  })

  const renderList = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return (
        <ul id="nav-mobile" className="right">
          <li>
            <i data-target="modal1" className="large material-icons modal-trigger" style={{ color: "black" }}>
            <a href="#">search</a>
            </i>
          </li>
          <li>{/* <a href="/createpost">Create Post</a> */}</li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/chat">Chat</a>
          </li>
          <li>
            <a
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
              }}
              href="/signin"
            >
              Sign Out
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul id="nav-mobile" className="right">
          {/* <li>
            <a href="/About">About</a>
          </li> */}
          <li>
            <a href="/signin">Sign In</a>
          </li>
          <li>
            <a href="/signup">Sign Up</a>
          </li>
        </ul>
      );
    }
  };

  const navbarStyle = {
    background: "#007BFF", // Blue background color
    color: "#fff", // White text color
    fontSize: "18px", // Font size for the text
  };

const fetchUsers = (query) => {
  setSearch(query);
  fetch(`${SERVER_URL}/search-users`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then(res => res.json())  // This line is expecting JSON
    .then(results => {
      console.log("wqdwqdw", results)
      setUserDetails(results.users);
    })
    .catch(err => {
      console.log(err);
    });
};


<input
  type="text"
  placeholder="search users"
  value={search}
  onChange={(e) => fetchUsers(e.target.value)}
/>


  return (
    <nav style={navbarStyle}>
      <div className="nav-wrapper white">
        <a href={state ? "/signin" : "/"} className="brand-logo left">
          Sharify
        </a>
        {renderList()}
      </div>
      <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="Search Users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
             {userDetails.length > 0 && userDetails.map(item => (
              <Link
                to={item?._id !== state?._id ? "/profile/" + item?._id : '/profile'}
                onClick={() => {
                  M.Modal.getInstance(searchModal?.current).close();
                  setSearch('');
                }}
              >
                <li>{item?.name}</li>
                <br></br>

              </Link>
            ))}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
    </nav>
  );
};

export default NavBar;
