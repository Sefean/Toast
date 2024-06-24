import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [arrToast, setArrToast] = React.useState([]);

  function createToast(message, variant) {
    const newToast = {
      message: message,
      variant: variant,
      id: crypto.randomUUID(),
    };

    const newArrToast = [...arrToast, newToast];
    setArrToast(newArrToast);
  }

  function deleteToast(idToRemove) {
    let filteredToast = arrToast.filter((toast) => toast.id !== idToRemove);
    setArrToast(filteredToast);
  }

  function useEscapeKey(callback) {
    React.useEffect(() => {
      function handleKeyDown(event) {
        if (event.key === "Escape") {
          callback(event);
        }
      }

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  }

  useEscapeKey(() => {
    setArrToast([]);
  });

  return (
    <ToastContext.Provider value={{ arrToast, createToast, deleteToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
