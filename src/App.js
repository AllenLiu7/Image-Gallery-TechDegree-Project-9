import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Searchform from "./components/searchform";
import Navigation from "./components/nav";
import Gallery from "./components/gallery";
import Apikey from "./config";
import Cats from "./components/horses";
import Dogs from "./components/dogs";
import Horses from "./components/horses";

class App extends Component {
  constructor() {
    super();
    this.state = {
      galleryitems: [],
      loading: false
    };
  }

  componentDidMount() {
    this.performSearch();
  }
  performSearch = (tag = "sunrise") => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Apikey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          galleryitems: response.data.photos.photo,
          loading: true
        });
      })
      .catch(error => {
        console.log("Error fetching or pharsing data", error);
      });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Searchform onSearch={this.performSearch} />
          <Navigation Click={this.performSearch} />
          <Switch>
            <Route
              path="/"
              exact
              render={
                () => <Gallery data={this.state.galleryitems} />
                // this.state.loading ? (
                //   <Gallery data={this.state.galleryitems} />
                // ) : (
                //   <p>loading</p>
                // )
              }
            />
            <Route
              path="/cat"
              render={props => <Cats data={this.state.galleryitems} />}
            />
            <Route
              path="/dog"
              render={props => <Dogs data={this.state.galleryitems} />}
            />
            <Route
              path="/horse"
              render={props => <Horses data={this.state.galleryitems} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
