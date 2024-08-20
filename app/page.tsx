import PromptImage from "@/lib/components/PromptImage/PromptImage";
import PromptInput from "@/lib/components/PromptInput/PromptInput";
import styles from "./styles/index.module.css";
import React from "react";

/**
 * Renders the index page of the application.
 */
export default function IndexPage() {
  return (
    <div className={styles.promptContainer}>
      <PromptInput />
      <PromptImage />
    </div>
  );
}
