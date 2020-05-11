import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav id="header">
    <div className="uk-container">
      <div className="header--home">
        <h3>
          <Link to="/" className="uk-link-heading uk-link-reset">
            Ingredient Converter
          </Link>
        </h3>
      </div>
    </div>
  </nav>
);

export default Header;
