import React, { Component } from "react";
import Galleryitem from "./galleryitem";

const Dogs = props => {
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
      <ul>{gallerylist}</ul>
    </div>
  );
};

export default Dogs;