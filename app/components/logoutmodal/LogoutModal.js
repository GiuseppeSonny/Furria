import React from 'react';
import styles from './logoutmodal.module.scss';

const LogoutModal = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalText}>Sei sicuro di voler uscire?</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onConfirm}>Si</button>
          <button className={styles.cancelButton} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
