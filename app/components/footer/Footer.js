"use client";

import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.scss";
import LogoutModal from "../logoutmodal/LogoutModal";

export default function Footer() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoClick = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    console.log("utente uscito");
    setShowLogoutModal(false);
  };

  return (
    <div className={styles.footer}>
      <Link href="/" className={`${styles.footerButton} ${styles.active}`}>
        <FaHome />
        <span>Home</span>
      </Link>
      <div className={styles.footerButton} onClick={handleLogoClick}>
        <Image
          src="/furrialogo_corto.svg"
          alt="Logout"
          width={24}
          height={24}
          className={styles.inactiveIcon}
        />
      </div>
      <Link href="/profile" className={styles.footerButton}>
        <FaUser className={styles.inactiveIcon} />
        <span>Profile</span>
      </Link>
      {showLogoutModal && (
        <LogoutModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
}
