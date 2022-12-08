import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import apiHandler from "../../api/apiHandler";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import "./FormSign.css";
import popcorn from "./../../styles/img/pop-corn.png";

const FormSignIn = () => {
  const [{ email, password }, handleChange] = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .signin({ email, password })
      .then((res) => {
        console.log(res);
        storeToken(res.authToken);
        authenticateUser();
        navigate("/movies");
      })
      .catch((e) => {
        setError(e.response.data);
      });
  };

  return (
    <div className="form-sign-in">
      {error && <h3 className="error">{error.message}</h3>}
      <form onSubmit={handleSubmit}>
        <div className="Form">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={password}
              placeholder="Password"
            />
          </div>
          <div>
            <button>
              <img src={popcorn} alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormSignIn;

// const token = localStorage.getItem('authToken')

// axios.get("http://localhost:8080/api/private", {
// 	headers: {
// 		Authorization: `Bearer ${token}` ,
// 	},
// })
