"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

/**
 * Displays two tabs: Public and Gallery.
 * The active tab is highlighted based on the current path.
 */
export default function Navbar() {
  const currentPath = usePathname();
  return (
    <nav className={styles.tabs}>
      <Link
        href="/"
        className={
          styles.tab + (currentPath === "/" ? " " + styles.active : "")
        }
      >
        Generate
      </Link>

      <Link
        href="/gallery"
        className={
          styles.tab + (currentPath === "/gallery" ? " " + styles.active : "")
        }
      >
        Gallery
      </Link>
    </nav>
  );
}
