import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UnAuth from "./pages/UnAuth";
import User from "./pages/User";
import { useAuth } from "./store/auth";

function App() {
  const { isLoggedIn } = useAuth();
  console.log("login or not ", isLoggedIn);
  return (
    <>
    <Router>
    <Routes>
      <Route exact path="*" element={!isLoggedIn ? <UnAuth/> : <Navigate to="/user"/>}/>
      <Route exact path="/user/*" element={isLoggedIn ? <User/> : <Navigate to="/login"/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
