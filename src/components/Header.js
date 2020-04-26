import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav id="header">
    <div className="container">
      <div className="header--home">
        <Link to="/">
          <h4>Ingredient Converter</h4>
        </Link>
      </div>
    </div>
  </nav>
);

export default Header;
