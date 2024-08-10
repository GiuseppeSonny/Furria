'use client';

import styles from './userprofile.module.scss';

export default function UserProfile() {
  return (
    <div className={styles.userProfile}>
      <div className={styles.profileHeader}>
        <img src="/profile.jpg" alt="Profile" className={styles.profileImage} />
        <h2>@asdrubaletrip89</h2>
      </div>
      <div className={styles.profileDetails}>
        <p><strong>Full Name:</strong> </p>
        <p><strong>E-Mail:</strong> </p>
        <p><strong>Gender:</strong> </p>
        <p><strong>Birth Date:</strong> </p>
        <p><strong>Telephone:</strong></p>
      </div>
    </div>
  );
}
