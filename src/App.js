import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Searchform from "./components/searchform";
import Navigation from "./components/nav";
import Gallery from "./components/gallery";
import Apikey from "./config";

class App extends Component {
  constructor() {
    super();
    this.state = {
      galleryitems: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Apikey}&tags=sunset&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          galleryitems: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log("Error fetching or pharsing data", error);
      });
  }

  render() {
    console.log(this.state.galleryitems);
    return (
      <div className="container">
        <Searchform />
        <Navigation />
        <Gallery data={this.state.galleryitems} />
      </div>
    );
  }
}

export default App;
