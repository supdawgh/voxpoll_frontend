import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import NameDisplay from "../../components/NameDisplay/NameDisplay";
import NameDisplay2 from "../../components/NameDisplay2/NameDisplay2";
import NameDisplay3 from "../../components/NameDisplay3/NameDisplay3";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <NameDisplay3 category={category} />
      <NameDisplay category={category} />
      <NameDisplay2 category={category} />
    </div>
  );
};

export default Home;
