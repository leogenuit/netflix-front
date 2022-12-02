import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import service from "../api/apiHandler";
import UserContext from "../auth/UserContext";
import edit from "./../styles/img/button-edit.png";
import "./OneMovie.css";
import { useNavigate } from "react-router-dom";
import Youtube from "react-youtube";

const OneMovie = () => {
  const { currentUser } = useContext(UserContext);
  const [movie, setMovie] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [iframeStyle, setIframeStyle] = useState({
    width: "100%",
    height: "500px",
    top: "0",
  });
  const [hiddenGhost, setHiddenGhost] = useState(false);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    service.get(`/api/movies/${id}`).then((response) => {
      console.log(response.data);
      setMovie(response.data);
    });
  }, []);

  if (!movie) {
    return <div className="loading">Loading....</div>;
  }

  const playVideo = (event) => {
    console.log(event.target);
    event.target.playVideo();
    event.target.hideVideoInfo();
  };

  const handleDelete = () => {
    service.delete(`/api/movies/${id}`).then(navigate("/"));
  };

  return (
    <div className="OneMovie">
      {!showVideo && (
        <img
          src={movie.img}
          onMouseEnter={() => {
            setTimeout(() => {
              setShowVideo(true);
            }, 800);
          }}
          alt="movie"
        />
      )}
      {showVideo && (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${movie.video}?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameborder="0"
            style={iframeStyle}
            onMouseLeave={() => {
              setShowVideo(false);
              setHiddenGhost(false);
              setIframeStyle({
                width: "100%",
                height: "500px",
                top: "0",
              });
            }}
          ></iframe>
          <div
            className="Ghost"
            hidden={hiddenGhost}
            style={iframeStyle}
            onClick={() => {
              setHiddenGhost(true);
              setIframeStyle({
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: "0",
                left: "0",
              });
            }}
          ></div>
        </>
      )}
      <div className="border-white">
        <div className="titleAndYear">
          <p>{movie.title}</p>
          <p>({movie.year})</p>
        </div>
        <p>{movie.description}</p>
        {/* <Youtube videoId={movie.video} opts={opts} onReady={playVideo} /> */}

        <div className="AllButtons">
          <div>
            {currentUser?.isAdmin && (
              <Link to={`/movies/${id}/update`}>
                <img className="edit" src={edit} alt="button" />
              </Link>
            )}
          </div>
          <div>
            {currentUser?.isAdmin && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneMovie;
