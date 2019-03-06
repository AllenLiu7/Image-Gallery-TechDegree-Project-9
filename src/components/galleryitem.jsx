import React from "react";

const Galleryitem = props => {
  return (
    <li>
      <img src={props.url} alt="" />
    </li>
  );
};

export default Galleryitem;
