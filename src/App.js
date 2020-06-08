import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import FavouritesPage from "./pages/Favourites/FavouritesPage";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/Restaurant-Finder" component={Home} />
            <Route exact path="/Restaurant-Finder/search" component={Search} />
            <Route exact path="/Restaurant-Finder/favourites" component={FavouritesPage} />
            <Route path='/Restaurant-Finder/restaurant/:id' component={RestaurantPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
