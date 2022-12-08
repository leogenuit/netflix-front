import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./FormSign.css";

const FormSignUp = () => {
  const [values, handleChange] = useForm({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .signup(values)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };
  return (
    <div className="form-sign-up">
      {error && <h3 className="error">{error.message}</h3>}
      <form onSubmit={handleSubmit}>
        <div className="Form">
          <div>
            <input
              onChange={handleChange}
              value={values.name}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              value={values.email}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              value={values.password}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormSignUp;
