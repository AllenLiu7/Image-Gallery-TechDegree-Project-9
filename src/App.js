import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Searchform from "./components/searchform";
import Navigation from "./components/nav";
import Gallery from "./components/gallery";
import Apikey from "./config";
//import Gallerytest from "./components/gallerytest";
import Cats from "./components/cats";
import Dogs from "./components/dogs";
import Horses from "./components/horses";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sunrise: [],
      cats: [],
      dogs: [],
      horses: [],
      searchItem: []
    };
  }

  componentDidMount() {
    this.search();
    this.defaultSearch("cats");
    this.defaultSearch("dogs");
    this.defaultSearch("horses");
  }

  defaultSearch = tag => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Apikey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          [tag]: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log("Error fetching or pharsing data", error);
      });
  };

  search = (tag = "sunrise") => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Apikey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          searchItem: response.data.photos.photo,
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
          <Searchform onSearch={this.search} />
          <Navigation />
          <Switch>
            <Route
              path="/"
              exact
              render={
                () => <Gallery data={this.state.searchItem} />
                // this.state.loading ? (
                //   <Gallery data={this.state.galleryitems} />
                // ) : (
                //   <p>loading</p>
                // )
              }
            />
            <Route
              path="/cat"
              render={props => <Cats data={this.state.cats} />}
            />
            <Route
              path="/dog"
              render={props => <Dogs data={this.state.dogs} />}
            />
            <Route
              path="/horse"
              render={props => <Horses data={this.state.horses} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
