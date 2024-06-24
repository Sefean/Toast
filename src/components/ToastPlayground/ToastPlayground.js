import React from "react";

import styles from "./ToastPlayground.module.css";

import Button from "../Button";
import ToastShelf from "../ToastShelf";

import { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variantType, setVariantType] = React.useState(VARIANT_OPTIONS[0]);

  const { createToast } = React.useContext(ToastContext);

  function handleEnterPress(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleAddMessage();
    }
  }

  function handleAddMessage() {
    createToast(message, variantType);
    setMessage("");
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf></ToastShelf>
      <form
        className={styles.controlsWrapper}
        onSubmit={(event) => {
          event.preventDefault();
          handleAddMessage();
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              required
              value={message}
              className={styles.messageInput}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyDown={handleEnterPress}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>

          {VARIANT_OPTIONS.map((option) => {
            const id = `variant-${option}`;
            return (
              <div
                key={id}
                className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              >
                <label htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variantType}
                    onChange={(event) => {
                      setVariantType(event.target.value);
                    }}
                  />
                  {option}
                </label>
              </div>
            );
          })}
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
