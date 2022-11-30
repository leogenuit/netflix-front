import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../api/apiHandler";
import UserContext from "../auth/UserContext";
import edit from "./../styles/img/button-edit.png";

const OneMovie = () => {
  const { currentUser } = useContext(UserContext);
  const [movie, setMovie] = useState([]);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    service.get(`/api/movies/${id}`).then((response) => {
      console.log(response.data);
      setMovie(response.data);
    });
  }, []);

  if (!movie) {
    return <div className="loading">Loading....</div>;
  }
  return (
    <div className="oneMovie">
      {currentUser?.isAdmin && <h2>I'm Admin</h2>}
      <p>{movie.title}</p>
      <img src={movie.img} alt="movie" />
      <p>{movie.description}</p>
      <p>{movie.video}</p>
      <p>{movie.year}</p>
      {currentUser?.isAdmin && (
        <Link to={`/movies/${id}/update`}>
          <img src={edit} alt="button" />
        </Link>
      )}
    </div>
  );
};

export default OneMovie;
