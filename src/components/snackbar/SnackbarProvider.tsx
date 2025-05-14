"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import MySnackbar from "./Snackbar";

type SEVERITY = "success" | "error" | "info" | "warning";

type SnackbarContextType = {
  addErrorMessage: (message: string) => void;
  addMessage: (message: string, severity: SEVERITY) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarMessage, setSnackbarMessage] = useState<
    { message: string; severity: SEVERITY } | undefined
  >();

  const addErrorMessage = (message: string) => {
    setSnackbarMessage({ message: message, severity: "error" });
  };

  const addMessage = (message: string, severity: SEVERITY) => {
    setSnackbarMessage({ message, severity });
  };

  const handleClose = () => setSnackbarMessage(undefined);

  return (
    <SnackbarContext.Provider value={{ addErrorMessage, addMessage }}>
      {children}
      {snackbarMessage != null && (
        <MySnackbar
          onClose={handleClose}
          message={snackbarMessage?.message}
          severity={snackbarMessage.severity}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
