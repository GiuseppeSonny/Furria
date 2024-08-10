"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./copyright.module.scss";

const Copyright = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <div className={styles.main}>
      <section className={styles.mainWrapper}>
        <h1 className={styles.subtitle}>
          <strong>{`Copyright`}</strong>
        </h1>
        <h2 className={styles.text}>{`Copyright Notice`}</h2>
        <h3 className={styles.text}>{`© 2024 Furrìa. All Rights Reserved.`}</h3>
        <p className={styles.text}>
          {`
This application and its contents are protected by copyright laws. Unauthorized use, reproduction, or distribution of any part of this application, including but not limited to text, graphics, images, and code, is strictly prohibited without prior written permission from Furrìa.
`}
        </p>
        <h2 className={styles.text}>Usage Rights</h2>
        <p
          className={styles.text}
        >{`Users are granted a limited license to access and use this application for personal and non-commercial purposes only. Any other use, including but not limited to the reproduction, modification, distribution, transmission, republication, display, or performance of the content of this application is strictly prohibited without prior written consent from Furrìa.`}</p>

        <h2 className={styles.text}>Trademarks</h2>
        <p
          className={styles.text}
        >{`All trademarks, service marks, and logos displayed in this application are the property of their respective owners. Use of these marks is not permitted without the prior written consent of Furrìa or the third-party owner.`}</p>

        <h2 className={styles.text}>{`Disclaimer`}</h2>
        <p
          className={styles.text}
        >{`Furrìa provides this application "as is" without any representations or warranties, express or implied. Furrìa makes no representations or warranties in relation to this application or the information and materials provided herein. `}</p>
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

export default Copyright;
