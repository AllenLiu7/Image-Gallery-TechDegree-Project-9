import React, { Component } from "react";
import "./App.css";
//import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Searchform from "./components/searchform";
import Navigation from "./components/nav";
// import Gallery from "./components/gallery";
//import Apikey from "./config";
import Gallerytest from "./components/gallerytest";
//import Cats from "./components/cats";
//import Dogs from "./components/dogs";
//import Horses from "./components/horses";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // componentDidMount() {
  //   this.performSearch();
  // }
  // performSearch = (tag = "sunrise") => {
  //   axios
  //     .get(
  //       `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Apikey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
  //     )
  //     .then(response => {
  //       this.setState({
  //         galleryitems: response.data.photos.photo,
  //         loading: true
  //       });
  //     })
  //     .catch(error => {
  //       console.log("Error fetching or pharsing data", error);
  //     });
  // };

  render() {
    return (
      <Router>
        <div className="container">
          <Searchform onSearch={this.performSearch} />
          <Navigation />
          <Switch>
            <Route
              path="/"
              exact
              render={
                () => <Gallerytest searchItem={"sunset"} />
                // this.state.loading ? (
                //   <Gallery data={this.state.galleryitems} />
                // ) : (
                //   <p>loading</p>
                // )
              }
            />
            <Route
              path="/cat"
              render={props => <Gallerytest searchItem={"waterfall"} />}
            />
            <Route
              path="/dog"
              render={props => <Gallerytest searchItem={"sun"} />}
            />
            <Route
              path="/horse"
              render={props => <Gallerytest searchItem={"raining"} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
