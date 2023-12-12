function Post({
  username,
  songName,
  songArtist,
  songAlbum,
  caption,
  albumUrl,
  caption,
}) {
  return (
    <div className="post">
      <div className="post-header">
        <img
          className="post-user-photo"
          src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
          alt="User 1"
        />
        <h4 className="post-user-name">{username}</h4>
      </div>
      <div className="post-details">
        <div className="song-name">{songName}</div>
        <div className="song-details">
          <p className="song-artist">{songArtist}</p>
          <p className="song-album">{songAlbum}</p>
        </div>
      </div>
      <img className="post-album-art" src={albumUrl} alt="User 1" />
      <p className="post-content">{caption}</p>
      <div className="post-actions">
        <button className="post-action" onClick={handleLike}>
          Like
        </button>
        <button className="post-action" onClick={handleComment}>
          Comment
        </button>
        <button className="post-action" onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
}

export default Post;
