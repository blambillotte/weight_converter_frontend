import React from "react";

const LoadingBlock = ({ itemCount = 1 }) => (
  <div className="loading-block">
    <div className="loading-block-wrapper">
      {[...Array(itemCount)].map((_x, i) => {
        return <div className="loading-item" key={`loading${i}`} />;
      })}
    </div>
  </div>
);

export default LoadingBlock;
