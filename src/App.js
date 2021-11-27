import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import MainNavbar from "./components/navbar/MainNavbar";
import Trending from "./components/pages/Trending";
import Search from "./components/pages/Search";
import Series from "./components/pages/Series";
import Movies from "./components/pages/Movies";
import Random from "./components/movieInfo/Random";
function App() {
  return (
    <Router>
      <Header />

      <div className="App">
        <div>
          <Switch>
            <Route exact path="/" component={Trending} />
            <Route  path="/movies" component={Movies} />
            <Route  path="/series" component={Series} />
            <Route  path="/search" component={Search} />
            <Route   path="/random" component={Random} />
          </Switch>
        </div>
      </div>
      <MainNavbar />
    </Router>
  );
}

export default App;
