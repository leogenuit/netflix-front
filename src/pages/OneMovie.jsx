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
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [iframeStyle, setIframeStyle] = useState({
    width: "100%",
    height: "500px",
    top: "0",
  });
  const [isFavorite, setIsFavorite] = useState(false);
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
      setMovie(response.data);
    });
    service.get(`/api/favori/${id}`).then((response) => {
      console.log(response.data);
      if (response.data) {
        setIsFavorite(true);
      }
    });
  }, []);

  if (!movie) {
    return <div className="loading">Loading....</div>;
  }

  const playVideo = (event) => {
    event.target.playVideo();
    event.target.hideVideoInfo();
  };

  const handleDelete = () => {
    service.delete(`/api/movies/${id}`).then(navigate("/movies"));
  };

  const addFavoris = () => {
    service.post(`/api/favori/${id}`).then((response) => {
      console.log("favori");
      setIsFavorite(true);

      // navigate("/favori");
    });
  };

  const deleteFavoris = () => {
    service.delete(`/api/favori/${id}`).then((response) => {
      console.log("delete");
      setIsFavorite(false);
    });
  };

  return (
    <div className="MovieFlex">
      <div className="OneMovie">
        {!showVideo && (
          <img
            src={movie.img}
            onMouseEnter={() => {
              setTimeout(() => {
                setShowVideo(true);
              }, 500);
            }}
            alt="movie"
          />
        )}
        {showVideo && (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${movie.video}?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              style={iframeStyle}
              onMouseLeave={() => {
                setShowVideo(false);
                setHiddenGhost(false);
                setIframeStyle({
                  width: "100%",
                  height: "300px",
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
                  borderRadius: "0",
                });
              }}
            ></div>
          </>
        )}
      </div>
      <div className="OneMovieDetails">
        <div className="titleAndGenre">
          <div className="titleAndYear">
            <p>Title : {movie.title}</p>
            <p>({movie.year})</p>
            {!isFavorite ? (
              <button className="stars" onClick={addFavoris}>
                ☆
              </button>
            ) : (
              <button className="stars" onClick={deleteFavoris}>
                ⭐️
              </button>
            )}
          </div>
          <div>
            <ul>
              <li className="Genre">Genre :</li>
              {movie.category.map((cat) => (
                <li className="OneMovieCategory" key={cat._id}>
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="Description">
          <p>Description : {movie.description}</p>
        </div>

        <div className="AllButtons">
          <div>
            {currentUser?.isAdmin && (
              <Link to={`/movies/${id}/update`}>
                <button className="ButtonEditDelete">Edit</button>
              </Link>
            )}
          </div>
          <div>
            {currentUser?.isAdmin && (
              <button className="ButtonEditDelete" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneMovie;
