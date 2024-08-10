"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./page.module.scss";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div className={styles.main}>
      <section className={styles.mainWrapper}>
        <h2 className={styles.title}>
          <strong>Furrìa</strong>
        </h2>
        <h3 className={styles.subtitle}>
          <strong>{`"Chi siamo"`}</strong>
        </h3>
        <p className={styles.text}>
          {`Siamo un gruppo di viaggiatori e sviluppatori che hanno unito le loro
          passioni per creare: Furrìa, l'app che semplifica la
          pianificazione dei viaggi. Grazie alla nostra esperienza nel settore
          del turismo e alle nostre competenze tecniche, abbiamo sviluppato una
          piattaforma completa e personalizzabile che ti accompagnerà in ogni
          tua avventura. La nostra visione Il nostro obiettivo è quello di
          rivoluzionare il modo in cui le persone pianificano e vivono i loro
          viaggi. Vogliamo creare una community di viaggiatori che si scambino
          consigli e esperienze, e che insieme possano esplorare il mondo in
          modo più consapevole e sostenibile. Perché Furrìa? Perché crediamo che
          ogni viaggio sia un'opportunità per crescere e imparare. Perché
          vogliamo che tu possa vivere esperienze autentiche e indimenticabili.
          Perché siamo appassionati di tecnologia e vogliamo utilizzare le
          nostre competenze per migliorare la tua vita.`}
        </p>
      </section>
      <h2 className={styles.title}>The Developers</h2>
      <section className={styles.teamDescription}>
        <div className={styles.teamCard}>
          {developers.map((dev) => (
            <div className={styles.card} key={dev.name}>
              <Image
                src={dev.image}
                alt={dev.name}
                width={150}
                height={170}
                className={styles.image}
                onClick={() => handleImageClick(dev.image)}
              />
              <h3 className={styles.cardTitle}>{dev.name}</h3>
              <p className={styles.cardText}>{dev.role}</p>
              <div className={styles.btnWrapper}>
                <Link href={dev.github}>
                  <FaGithub /> Github
                </Link>
                <Link href={dev.linkedin}>
                  <FaLinkedin /> Linkedin
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Modal Image"
              width={500}
              height={500}
            />
            <button className={styles.closeButton} onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const developers = [
  {
    name: "Susanna Palmeri",
    role: "Frontend Developer",
    image: "/images/noi/Susanna.jpg",
    github: "https://github.com/GaleSuzu",
    linkedin: "https://www.linkedin.com/in/susanna-palmeri",
  },
  {
    name: "Roberta Favuzza",
    role: "Frontend Developer",
    image: "/images/noi/Roberta.jpg",
    github: "https://github.com/robertafavuzza",
    linkedin: "https://www.linkedin.com/in/roberta-favuzza",
  },
  {
    name: "Giuseppe Neri",
    role: "Frontend Developer",
    image: "/images/noi/Peppe.jpg",
    github: "https://github.com/GiuseppeSonny",
    linkedin: "https://www.linkedin.com/in/giuseppe-neri23/",
  },
  {
    name: "Paolo Caramia",
    role: "Frontend Developer",
    image: "/images/noi/Paolo.jpg",
    github: "https://github.com/Paolo131084",
    linkedin: "http://www.linkedin.com/in/paolo-caramia",
  },
  {
    name: "Alberto Palmeri",
    role: "Frontend Developer",
    image: "/images/noi/Alberto.jpg",
    github: "https://github.com/Alb4rto",
    linkedin: "https://www.linkedin.com/in/alberto-palmeri",
  },
];

export default About;
