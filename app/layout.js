"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingStartApp from "./components/loading-startapp/LoadingStartApp";
import Context from "./(context)/Provider";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import styles from "./page.module.css"; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

function MainLayout({ children }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("loadingShown")) {
      const timer = setTimeout(() => {
        setInitialLoading(false);
        sessionStorage.setItem("loadingShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setInitialLoading(false);
    }
  }, []);

  const path = router.pathname;
  const showNavbarAndFooter = path !== "/city-plan";

  return (
    <>
      {initialLoading ? (
        <LoadingStartApp />
      ) : (
        <div className={styles.mainContainer}>
          {showNavbarAndFooter && <Navbar />}
          <div className={styles.content}>
            {children}
          </div>
          {showNavbarAndFooter && <Footer />}
        </div>
      )}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Context>
          <MainLayout>{children}</MainLayout>
        </Context>
      </body>
    </html>
  );
}
