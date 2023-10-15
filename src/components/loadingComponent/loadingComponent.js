import React from "react";
import styles from "./loadingComponent.module.css";

const Loading = ({ children }) => {
  return (
      <div className={styles.loadingContainer}>
        <h1 className={styles.loadingText}>{children || "Carregando..."}</h1>
      </div>
  );
};

export default Loading;
