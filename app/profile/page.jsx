"use client";
import styles from "./profile.module.scss";
import React from "react";
import { FaPhone } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

const profile = () => {
  return (
    <div className={styles.profile_container}>
      <h2 className={styles.profile_name}>Jigen Daisuke</h2>

      <p className={styles.profile_bio}>
        <img className={styles.profile_img} src="/images/jijen.jpg" alt="" />
        Sono un appassionato viaggiatore, un&apos;anima nomade che trova
        ispirazione nei viaggi. Con una valigia sempre pronta, esplora il mondo
        alla ricerca di avventure e nuove prospettive. Mi piace catturare i
        momenti più belli dei miei viaggi per condividerli con gli altri e
        creare ricordi indelebili. Il mio obiettivo è ispirare gli altri a
        &quot;vivere&quot; il mondo...
      </p>
      <div className={styles.profile_contatti}>
        <p>
          <FaPhone /> 123456
        </p>
        <p>
          <MdAlternateEmail /> jijen1234@example.com
        </p>
      </div>
    </div>
  );
};

export default profile;
