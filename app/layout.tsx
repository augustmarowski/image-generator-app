import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import type { ReactNode } from "react";
import { StoreProvider } from "@/lib/components/StoreProvider/StoreProvider";
import Navbar from "@/lib/components/Navbar/Navbar";
import ApiKeyModal from "@/lib/components/ApiKeyModal/ApiKeyModal";

interface Props {
  readonly children: ReactNode;
}

/**
 * RootLayout is the main layout component for the application.
 * It wraps the entire application in a StoreProvider and provides a consistent layout.
 */
export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <title>Image Generation</title>
          <meta name="description" content="Image Generation with AI" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div className={styles.container}>
            <ApiKeyModal />
            <div className={styles.header}>
              <h1>AI Image Generator</h1>
              <Navbar />
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
