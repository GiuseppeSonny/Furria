import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./citycardlist.module.scss";
import CityCard from "../cityCard/cityCard";

export default function CityCardList({ list = [], searchQuery }) {
  const router = useRouter();
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    let cities = [...list];

    if (searchQuery) {
      cities = cities.filter((city) =>
        city.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    cities.sort((a, b) => new Date(a.from) - new Date(b.from));

    setFilteredCities(cities);
  }, [searchQuery, list]);

  const navigateToCityPlan = () => {
    router.push("/city-plan");
  };

  const handleCardClick = (id, cityName, from) => {
    router.push(
      `/trip/${id}?name=${encodeURIComponent(cityName)}&date=${from}`
    );
  };

  return (
    <div className={styles.cityCardList}>
      <div className={styles.header}>
        <h2 className={styles.title}>Waiting for...</h2>
      </div>
      <ul className={styles.cardsContainer}>
        {filteredCities.map((city, index) => (
          <CityCard
            key={index}
            city={city.city}
            id={city._id}
            from={city.from}
            to={city.to}
            onClick={() => handleCardClick(city._id, city.city, city.from)}
          />
        ))}
      </ul>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={navigateToCityPlan}>
          +
        </button>
      </div>
    </div>
  );
}
