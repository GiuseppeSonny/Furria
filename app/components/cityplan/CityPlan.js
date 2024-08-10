"use client";

import { useState } from "react";
import styles from "./cityplan.module.scss";
import MapModal from "../mapmodal/MapModal";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useRouter } from "next/navigation";

export default function CityPlan() {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showMapModal, setShowMapModal] = useState(false);
  const router = useRouter();

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (newStartDate > endDate) {
      setEndDate(newStartDate);
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTripData = {
      city: city,
      from: startDate,
      to: endDate,
    };
    try {
      const response = await fetch("/api/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTripData),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione della città");
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Errore nella pianificazione del viaggio:", error);
    }
  };

  return (
    <div className={styles.cityPlan}>
      <h1>Organizza il tuo viaggio</h1>
      <p>Crea il tuo itinerario e preparati al prossimo viaggio</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Dove?</label>
        <div className={styles.cityInputContainer}>
          <input
            type="text"
            id="name"
            name="name"
            value={city}
            onChange={handleCityChange}
            className={styles.cityInput}
            required
          />
          <GpsFixedIcon
            className={styles.gpsIcon}
            onClick={() => setShowMapModal(true)}
          />
        </div>
        <label htmlFor="dateStart">Inizio:</label>
        <input
          type="date"
          id="dateStart"
          name="dateStart"
          value={startDate}
          onChange={handleStartDateChange}
          min={new Date().toISOString().split("T")[0]}
          required
        />
        <label htmlFor="dateEnd">Fine:</label>
        <input
          type="date"
          id="dateEnd"
          name="dateEnd"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate}
          required
        />
        <button type="submit">Pianifica</button>
      </form>
      {showMapModal && (
        <MapModal city={city} onClose={() => setShowMapModal(false)} />
      )}
    </div>
  );
}
