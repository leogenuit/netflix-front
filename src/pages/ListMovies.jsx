import React, { useEffect, useState } from "react";
import service from "../api/apiHandler";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListMovie.css";
import SearchBar from "../components/SearchBar/SearchBar";

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    service.get("/api/movies").then((response) => {
      console.log(response);
      setMovies(response.data);
    });
  }, []);

  if (!movies.length) {
    return <div className="loading">Loading...</div>;
  }

  console.table(movies);
  return (
    <div>
      <SearchBar
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <div className="Container">
        <ul className="ListMovie">
          {movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchString.toLowerCase())
            )
            .map((movie) => {
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
    </div>
  );
};

export default ListMovies;
