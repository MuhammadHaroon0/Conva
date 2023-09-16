import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import useStore from "./store/store";
import Cookies from "js-cookie";

function App() {
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    if (Cookies.get('jwt')) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, []);

  
  return (
    <>
   
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Main/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
