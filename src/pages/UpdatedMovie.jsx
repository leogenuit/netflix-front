import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../api/apiHandler";
import UserContext from "../auth/UserContext";
// import edit from "./../styles/img/button-edit.png";
import "./UpdateMovie.css";

const UpdatedMovie = () => {
  const { currentUser } = useContext(UserContext);
  const [movie, setMovie] = useState("");
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    service.get(`/api/movies/${id}`).then((response) => {
      console.log(response.data);
      setMovie(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    service
      .patch(`/api/movies/${id}`, movie)
      .then((response) => {
        navigate(`/movies/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!movie) {
    return <div className="loading">Loading....</div>;
  }
  return (
    <div className="oneMovieUpdate">
      <h2>Update Movie</h2>

      <form className="FormUpdated" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category :</label>
          <input
            type="text"
            name="category"
            value={movie.category.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="img">Image :</label>
          <input
            type="text"
            name="img"
            value={movie.img}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <input
            type="text"
            name="description"
            value={movie.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="video">Video :</label>
          <input
            type="text"
            name="video"
            value={movie.video}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="year">year :</label>
          <input
            type="text"
            name="year"
            value={movie.year}
            onChange={handleChange}
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdatedMovie;
