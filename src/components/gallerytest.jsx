import React, { Component } from "react";
import axios from "axios";
import Apikey from "./config";

class Gallerytest extends Component {
  constructor(props) {
    super(props);
    this.state = { galleryitems: [] };
    let gallerylist;
  }

  componentDidMount() {
    this.performSearch(props.searchItem);
  }

  performSearch = tag => {
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

  gallerylist = galleryitems.map(result => (
    <Galleryitem
      url={`https://farm${result.farm}.staticflickr.com/${result.server}/${
        result.id
      }_${result.secret}.jpg`}
      key={result.id}
    />
  ));

  render() {
    return (
      <div className="photo-container">
        <h2>Results</h2>
        <ul>{gallerylist}</ul>
      </div>
    );
  }
}

export default gallerytest;
