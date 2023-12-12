import { useState } from "react";
import M from "materialize-css";
import SERVER_URL from "../../constants/constants";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");

  const makePost = () => {
    if (!caption || !spotifyLink) {
      M.toast({
        html: "Please fill all the fields",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    fetch(`${SERVER_URL}/createpost`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },

      body: JSON.stringify({
        caption,
        spotifyLink,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({
            html: data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          M.toast({
            html: "Created post successfully",
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
    <div className="post">
      <div className="card auth-card input-field">
        <h3 className="text-bla"> Create Post </h3>
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="url"
          placeholder="Spotify link of the song"
          value={spotifyLink}
          onChange={(e) => setSpotifyLink(e.target.value)}
        />
        <div>
        <button className="signInButton" onClick={() => makePost()}>
          Post
        </button>
        </div>
      </div>
    </div>
  );
  
};

export default CreatePost;
