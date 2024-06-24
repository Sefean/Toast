import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

import { ToastContext } from "../ToastProvider/ToastProvider";

function ToastShelf({ handleRemoveToast }) {
  const { arrToast } = React.useContext(ToastContext);

  return (
    <ol className={styles.wrapper}>
      {arrToast.map(({ message, variant, id }) => (
        <Toast
          key={id}
          variant={variant}
          id={id}
          handleRemoveToast={handleRemoveToast}
        >
          {message}
        </Toast>
      ))}
    </ol>
  );
}

export default ToastShelf;
