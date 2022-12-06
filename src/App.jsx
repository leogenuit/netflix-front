import { Routes, Route } from "react-router-dom";
import NavMain from "./components/Nav/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import LoggedOut from "./components/LoggedOut/LoggedOut";
import ListMovies from "./pages/ListMovies";
import AdminRoute from "./components/ProtectedRoute/AdminRoute";
import CreateMovie from "./pages/CreateMovie";
import OneMovie from "./pages/OneMovie";
import UpdatedMovie from "./pages/UpdatedMovie";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Routes>
        <Route element={<LoggedOut />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/movies" element={<ListMovies />} />
          {/* All routes after the PrivateRoute require the user to be loggedIn */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/movies" element={<ListMovies />} /> */}
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route index element={<h1>Welcome to the dashboard</h1>} />
        </Route>
        <Route path="create" element={<CreateMovie />} />
        <Route path="/movies/:id" element={<OneMovie />} />
        <Route path="/movies/:id/update" element={<UpdatedMovie />} />
        <Route path="/movies/:id/delete" element={<UpdatedMovie />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
