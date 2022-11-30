import React, { useEffect, useState } from "react";
import service from "../api/apiHandler";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListMovie.css";

const ListMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    service.get("/api/movies").then((response) => {
      console.log(response);
      setMovies(response.data);
    });
  }, []);

  if (!movies.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="Container">
      <ul className="ListMovie">
        {movies.map((movie) => {
          return (
            <div className="CardOneMovie">
              <Link to={`/movies/${movie._id}`}>
                <li key={movie.id}>
                  <img src={movie.img} alt="movie" />
                </li>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ListMovies;
