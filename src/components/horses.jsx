import React, { Component } from "react";
import Galleryitem from "./galleryitem";

const Horses = props => {
  const result = props.data;

  let gallerylist = (
    <Galleryitem
      url={`https://farm${result.farm}.staticflickr.com/${result.server}/${
        result.id
      }_${result.secret}.jpg`}
      key={result.id}
    />
  );

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <p>horses</p>
      <ul>{gallerylist}</ul>
    </div>
  );
};

export default Horses;
