import React, { Component } from "react";
import Galleryitem from "./galleryitem";
import Notfound from "./notfound";

const Gallery = props => {
  const results = props.data;

  let gallerylist;

  if (results.length > 0) {
    gallerylist = results.map(result => (
      <Galleryitem
        url={`https://farm${result.farm}.staticflickr.com/${result.server}/${
          result.id
        }_${result.secret}.jpg`}
        key={result.id}
      />
    ));
  } else {
    gallerylist = <Notfound />;
  }

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>{gallerylist}</ul>
    </div>
  );
};

export default Gallery;
