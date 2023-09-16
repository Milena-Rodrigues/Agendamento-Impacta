import React from "react";
import styles from "./Loading.module.css";

const Loading = ({ children }) => {
  return (
    <div className={styles.loadingContainer}>
      <h1 className={styles.loading}>{children}</h1>
    </div>
  );
};

export default Loading;
