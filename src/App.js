import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Credits from "./pages/Credits";

function App() {
  const [user, setUser] = useState();
  const [state2, setState2] = useState({
    user: { name: "", id: "", isLoggedIn: false },
    isLoading: true,
    gameData: {},
  });

  function handleLoginChange(input) {
    setState2(input);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login state={state2} setState={setState2} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/game">
          <Game state={state2} setState={setState2} />
        </Route>
        <Route path="/credits">
          <Credits state={state2} />
        </Route>
        <Route path="/*">
          <Home state2 invalidUrl={true} />
        </Route>
        <Route path="/">
          <Home
            isLoggedIn={state2.isLoggedIn}
            state={state2}
            setState={setState2}
            invalidUrl={false}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
