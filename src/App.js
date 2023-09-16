import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStorage } from "./UserContext";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import { Signup } from "./login/singup";
import Login from "./login/login";
import Home from "./home";

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute to={"/login"}>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
