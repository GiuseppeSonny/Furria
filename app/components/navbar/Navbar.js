import { useState } from "react";
import { FaBars } from "react-icons/fa";
import styles from "./navbar.module.scss";
import Link from "next/link";
import Avatar from "boring-avatars";
import AvatarModal from "../avatarmodal/AvatarModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("marble");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.profileContainer} onClick={openAvatarModal}>
          <Avatar
            size={40}
            name="User"
            variant={selectedAvatar}
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>
        <img src="/furrialogo.svg" alt="Furria Logo" className={styles.logo} />
        <FaBars className={styles.menuButton} onClick={toggleMenu} />

        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <Link
              href="/about"
              className={styles.dropdownItem}
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/copyright"
              className={styles.dropdownItem}
              onClick={toggleMenu}
            >
              Copyright
            </Link>
          </div>
        )}
      </div>
      {isAvatarModalOpen && (
        <AvatarModal
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          onClose={closeAvatarModal}
        />
      )}
    </div>
  );
}
