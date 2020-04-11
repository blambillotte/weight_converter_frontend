import React from "react";
import Search from "../../search/Search";
import "./Home.scss";

class Home extends React.Component {
  render() {
    return (
      <div id="home">
        <div className="container">
          <Search />
        </div>
      </div>
    );
  }
}

export default Home;
