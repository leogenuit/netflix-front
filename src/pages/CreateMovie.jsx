import React, { useEffect } from "react";
import { useState } from "react";
import service from "../api/apiHandler";
import { useNavigate } from "react-router-dom";
import "./CreateMovie.css";

const CreateMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    img: "",
    description: "",
    video: "",
    year: "",
    category: "",
  });
  const [validCategories, setValidCategories] = useState([]);

  const navigate = useNavigate();

  const { title, img, description, video, year, category } = movie;

  useEffect(() => {
    service.get("/api/category").then((response) => {
      setValidCategories(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setMovie((currentValue) => {
      return { ...currentValue, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    service.post("/api/movies", movie).then((response) => {
      console.log("hello");
      navigate("/movies");
    });
  };

  return (
    <div className="oneMovieCreate">
      <h2 className="CreateMovieTitle">Create Movie</h2>

      <form className="FormCreate" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category :</label>
          <select name="category" onChange={handleChange}>
            <option value="" disabled selected>
              --Please choose an option--
            </option>
            {validCategories.map((cat) => {
              return (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="img">Image :</label>
          <input type="text" name="img" value={img} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="description">Description :</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="video">Video :</label>
          <input
            type="text"
            name="video"
            value={video}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="year">year :</label>
          <input type="text" name="year" value={year} onChange={handleChange} />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateMovie;
