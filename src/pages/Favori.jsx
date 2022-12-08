import React, { useEffect, useState } from "react";
import service from "../api/apiHandler";
import "./Favori.css";
import XButton from ".././styles/img/x-button.png";
const Favori = () => {
  const [allFavoris, setAllFavoris] = useState([]);

  useEffect(() => {
    getFavoris();
  }, []);

  const getFavoris = () => {
    service.get("/api/favori").then((response) => {
      //   console.log(response.data);
      setAllFavoris(response.data);
    });
  };

  const deleteFavoris = (id) => {
    service.delete(`/api/favori/${id}`).then((response) => {
      console.log("delete");
      getFavoris();
    });
  };

  return (
    <div className="FavoritePage">
      <h1 className="MyFavoritesTitle">My Favorites</h1>;
      <div className="AllFavorites">
        {!allFavoris.length && (
          <p className="NoFavorite">You don't have any favorites yet ... 🫤</p>
        )}
        {allFavoris.map((fav) => {
          console.log(fav);
          return (
            <div key={fav._id} className="FavoriCard">
              <button
                className="DeleteFav"
                onClick={() => deleteFavoris(fav.movie._id)}
              >
                <img src={XButton} alt="" />
              </button>
              <img src={fav.movie.img} alt="movie" />
              <h2>{fav.movie.title}</h2>
              <p>{fav.movie.year}</p>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favori;
