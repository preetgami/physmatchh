import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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

// supabase
import { createClient } from "@supabase/supabase-js";
const supabaseURL = "https://pvyayzkxlhyozfwyriwv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eWF5emt4bGh5b3pmd3lyaXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxNzgyMjUsImV4cCI6MjAxNTc1NDIyNX0.FObVVy75W5gcTz7YFfVrzvfazOVuRX57wfBzxuDmL1U";
const supabase = createClient(supabaseURL, supabaseKey);

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  let routes;

  if (true) {
    routes = (
      <Routes>
        <Route exact path="/clients" element={<Clients />} />

        <Route exact path="/onboarding" element={<Onboarding />} />
        <Route exact path="/requests" element={<Requests />} />

        <Route
          exact
          path="/auth"
          element={<Auth supabase={supabase} session={session} />}
        />
      </Routes>
    );
  } else {
  }

  return (
    <Router>
      {/* switch enables one route only to be used */}
      <MainNavigation supabase={supabase} session={session} />
      <main>{routes}</main>
    </Router>
  );
}

export default App;
