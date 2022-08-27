import React from "react";

const Home = ({ type }) => {
  return <div>{type === "trending" ? "Trending" : "Home"}</div>;
};

export default Home;
