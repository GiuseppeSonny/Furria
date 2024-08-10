import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./mapmodal.module.scss";

const MapModal = ({ city, onClose }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([lat, lon]);
      }
    };

    if (city) {
      fetchCoordinates();
    }
  }, [city]);

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: `<div class="${styles.customIconContainer}"><i class="fa fa-map-marker-alt ${styles.customIcon}"></i></div>`
  });

  return (
    <div className={styles.mapModal}>
      <div className={styles.mapModalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {position && (
          <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
              <Popup>{city}</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default MapModal;
