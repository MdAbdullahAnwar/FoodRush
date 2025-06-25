import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <FoodDisplay searchTerm={searchTerm} />
    </>
  );
};

export default MenuPage;
