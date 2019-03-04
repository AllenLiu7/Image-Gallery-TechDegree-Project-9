import React, { Component } from "react";
import axios from "axios";
import Apikey from "../config";
import Galleryitem from "./galleryitem";

class Gallerytest extends Component {
  constructor(props) {
    super(props);
    this.state = { galleryitems: [] };
  }

  componentDidMount() {
    this.performSearch(this.props.searchItem);
  }

  performSearch = tag => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Apikey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          galleryitems: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log("Error fetching or pharsing data", error);
      });
  };

  render() {
    let gallerylist = this.state.galleryitems.map(result => (
      <Galleryitem
        url={`https://farm${result.farm}.staticflickr.com/${result.server}/${
          result.id
        }_${result.secret}.jpg`}
        key={result.id}
      />
    ));

    return (
      <div className="photo-container">
        <h2>Results</h2>
        <ul>{gallerylist}</ul>
      </div>
    );
  }
}

export default Gallerytest;
