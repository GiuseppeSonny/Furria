import styles from "./citycard.module.scss";
import { useRef, useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CityCard = ({ city, id, onClick, from, to }) => {
  const cityInput = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [cityName, setCityName] = useState(city);
  const [imageUrl, setImageUrl] = useState("/images/default-city.jpg");

  const handleActive = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const deleteCity = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/city/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response not Ok!");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const putCity = async (e) => {
    e.stopPropagation();
    const updateCity = {
      city: cityInput.current.value,
    };

    try {
      const response = await fetch(`/api/city/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCity),
      });
      if (!response.ok) {
        throw new Error("City not modified!");
      }
      setIsActive(false);
      setCityName(updateCity.city);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setCityName(city);
  }, [city]);

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const response = await axios.get(`https://pixabay.com/api/`, {
          params: {
            key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY,
            q: city,
            image_type: "photo",
            per_page: 3,
          },
        });
        if (response.data.hits.length > 0) {
          setImageUrl(response.data.hits[0].webformatURL);
        }
      } catch (error) {
        console.error("Errore nel recupero dell'immagine della città:", error);
      }
    };

    if (city) {
      fetchCityImage();
    }
  }, [city]);

  return (
    <>
      <li className={styles.cityCard} onClick={() => onClick(id, from)}>
        <div className={styles.cityImageContainer}>
          <img
            src={imageUrl}
            alt={cityName}
            className={styles.cityImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default-city.jpg";
            }}
          />
        </div>
        <div className={styles.cityInfo}>
          {isActive ? (
            <input
              type="text"
              defaultValue={cityName}
              ref={cityInput}
              onClick={handleInputClick}
              className={styles.cityInput}
            />
          ) : (
            <h4>{cityName}</h4>
          )}
          <div className={styles.cityDates}>
            <p>Dal: {new Date(from).toLocaleDateString()}</p>
            <p>Al: {new Date(to).toLocaleDateString()}</p>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button onClick={handleActive}>
            {isActive ? (
              <CloseIcon className={styles.icon} />
            ) : (
              <EditIcon className={styles.icon} />
            )}
          </button>
          {isActive && (
            <button onClick={putCity}>
              <SaveIcon className={styles.icon} />
            </button>
          )}
          <button onClick={deleteCity}>
            <DeleteIcon className={styles.icon} />
          </button>
        </div>
      </li>
    </>
  );
};

export default CityCard;
