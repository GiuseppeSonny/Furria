"use client";
import NoteCard from "../noteCard/noteCard";
import styles from "./NoteWrapper.module.scss";
import NoteModal from "../noteModal/NoteModal";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { FaSuitcase, FaStickyNote, FaMoneyBill } from "react-icons/fa";
import { useParams } from "next/navigation";
import { globalContext } from "../../(context)/Provider";
import Link from "next/link";

const NoteWrapper = ({ list, cityName }) => {
  const { id } = useParams();
  const { travelData } = useContext(globalContext);
  const [showModal, setShowModal] = useState(false);
  const [cityImage, setCityImage] = useState("/images/default-city.jpg");

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const response = await axios.get(`https://pixabay.com/api/`, {
          params: {
            key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY,
            q: cityName,
            image_type: "photo",
            per_page: 3,
          },
        });
        if (response.data.hits.length > 0) {
          setCityImage(response.data.hits[0].webformatURL);
        }
      } catch (error) {
        console.error("Errore nel recupero dell'immagine della città:", error);
      }
    };

    if (cityName) {
      fetchCityImage();
    }
  }, [cityName]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.wallet}>
      <header className={styles.header}>
        <div className={styles.cityInfo}>
          <img
            src={cityImage}
            alt={cityName}
            className={styles.cityImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default-city.jpg";
            }}
          />
          <div className={styles.cityDetails}>
            <h1 className={styles.city}>{cityName}</h1>
          </div>
        </div>
      </header>
      <div className={styles.body}>
        <div>
          <nav className={styles.navbar}>
            <Link
              href={`/trip/${id}?name=${cityName}`}
              className={styles.navButton}
            >
              <FaSuitcase />
              <span>My Journey</span>
            </Link>
            <Link
              href={`/note/${id}?name=${cityName}`}
              className={styles.navButtonNote}
            >
              <FaStickyNote />
              <span>My Notes</span>
            </Link>
            <Link
              href={`/wallet/${id}?name=${cityName}`}
              className={styles.navButton}
            >
              <FaMoneyBill />
              <span>Budget</span>
            </Link>
          </nav>
        </div>
        <div>
          {list.map((note, index) => (
            <NoteCard key={index} note={note} />
          ))}
        </div>
        <div className={styles.addButtonContainer}>
          <button className={styles.addButton} onClick={handleOpenModal}>
            Add Note
          </button>
        </div>
      </div>
      {showModal && (
        <NoteModal cityId={travelData.cityId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default NoteWrapper;
