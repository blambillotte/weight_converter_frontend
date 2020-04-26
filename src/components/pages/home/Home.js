import React from "react";
import Search from "../../search/Search";
import Header from "../../Header";

class Home extends React.Component {
  render() {
    return (
      <div id="home">
        <Header />
        <div className="container">
          <Search />
        </div>
      </div>
    );
  }
}

export default Home;
