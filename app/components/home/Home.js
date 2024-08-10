"use client";

import styles from "./home.module.scss";
import CityCardList from "../citycardlist/CityCardList";
import Searchbar from "../searchbar/Searchbar";
import { useContext, useEffect, useState } from "react";
import { globalContext } from "@/app/(context)/Provider";

export default function Home() {
  const { city } = useContext(globalContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.home}>
        <Searchbar onSearch={handleSearch} />
        <CityCardList list={city} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
