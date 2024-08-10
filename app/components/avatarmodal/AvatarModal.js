import React from "react";
import Avatar from "boring-avatars";
import styles from "./avatarmodal.module.scss";

const avatarVariants = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"];

const AvatarModal = ({ selectedAvatar, setSelectedAvatar, onClose }) => {
  const handleAvatarClick = (variant) => {
    setSelectedAvatar(variant);
    onClose();  
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Choose Your Avatar</h2>
        <div className={styles.avatarsGrid}>
          {avatarVariants.map((variant, index) => (
            <div
              key={index}
              className={styles.avatarOption}
              onClick={() => handleAvatarClick(variant)}
            >
              <Avatar
                size={80}
                name="User"
                variant={variant}
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;
