import React from "react";
import { useState } from "react";
import service from "../api/apiHandler";
const CreateMovie = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      img,
      description,
      video,
      year,
    };
    service.post("/api/movies", newMovie);
  };

  return (
    <div>
      <h2>Create Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="img">Image :</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description :</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="video">Video :</label>
          <input
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="year">year :</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateMovie;
