import { useState, useEffect } from 'react';
import styles from './loading.module.scss';

export default function LoadingStartApp() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <img src="/furrialogo.svg" alt="Furria Logo" className={styles.logo} />
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
