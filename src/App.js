import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { useEffect } from "react";
import MainNavigation from "./shared/Navigation/MainNavigation";
import Auth from "./Auth/Auth";
import { Authcontex } from "./shared/hooks/auth-context";
import useAuth from "./shared/hooks/auth-hook";
import Clients from "./clients/clients";
import Onboarding from "./Onboarding/Onboarding";
import Requests from "./requests/Requests";
import Book from "./Book/Book";
function App() {
  const { token, login, logout, userId } = useAuth()
  console.log("her",userId);
  let routes;

  if (token) {
    routes = (
      
      <Routes>
        <Route exact path="/clients" element={<Clients />} />

        <Route exact path="/onboarding" element={<Onboarding />} />
        <Route exact path="/requests" element={<Requests />} />

        <Route exact path="/auth" element={<Auth />} />
       
      </Routes>)
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Book />} />
        <Route exact path="/auth" element={<Auth />} />

      </Routes>
    )
  }

  return (
    <Authcontex.Provider value={{ islogedin: !!token, token: token, login: login, logout: logout, userId: userId }}>
      
      <Router>

        {/* switch enables one route only to be used */}
        <MainNavigation />
        <main>

          {routes}

        </main>
      </Router>
      
    </Authcontex.Provider>
  );
}

export default App;
