"use client";
import {
  closeApiKeyModal,
  openApiKeyModal,
  setApiKey,
} from "@/lib/features/ApiKey/apiKeySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import styles from "./ApiKeyModal.module.css";

/**
 * Displays a modal to enter the API key.
 * The API key is stored in the browser's local storage if the user chooses to do so.
 */
export default function ApiKeyModal() {
  const dispatch = useAppDispatch();
  const { apiKey, isApiKeyStored, displayApiKeyModal } = useAppSelector(
    (state) => state.apiKey
  );

  const handleSave = (
    event: React.FormEvent<HTMLFormElement> & {
      target: { apiKey: { value: string }; store: { checked: boolean } };
    }
  ) => {
    event.preventDefault();
    dispatch(
      setApiKey({
        apiKey: event.target.apiKey.value,
        store: event.target.store.checked,
      })
    );
  };

  const handleCancel = () => {
    dispatch(closeApiKeyModal());
  };

  const handleOpen = () => {
    dispatch(openApiKeyModal());
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      dispatch(closeApiKeyModal());
    }
  };

  return displayApiKeyModal ? (
    <div className={styles.modal} onClick={handleClickOutside}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Enter your API key</h2>
        <form onSubmit={handleSave} className={styles.form}>
          <input
            className={styles.input}
            name="apiKey"
            type="password"
            defaultValue={apiKey || ""}
          />
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="store"
              id="store"
              className={styles.checkbox}
              defaultChecked={isApiKeyStored}
            />
            <label htmlFor="store" className={styles.label}>
              <p>
                <strong>Store API Key</strong>
              </p>
              <p>The key will only be stored in your browser.</p>
            </label>
          </div>
          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={handleCancel}
              className={`${styles.button} ${styles.cancelButton}`}
            >
              Cancel
            </button>
            <button type="submit" className={styles.button}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <button className={styles.openModalButton} onClick={() => handleOpen()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-key"
      >
        <circle cx="8" cy="15" r="4" />
        <line x1="10.85" y1="12.15" x2="19" y2="4" />
        <line x1="18" y1="5" x2="20" y2="7" />
        <line x1="15" y1="8" x2="17" y2="10" />
      </svg>
    </button>
  );
}
