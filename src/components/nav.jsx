import React, { Component } from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to="/cat" /*onClick={props.Click("cat")}*/>Cats</Link>
        </li>
        <li>
          <Link to="/dog" /*onClick={props.onClick("dog")}*/>Dogs</Link>
        </li>
        <li>
          <Link to="/horse" /*onClick={props.onClick("Horse")}*/>Horses</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
