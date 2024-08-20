"use client";
import Image from "next/image";
import React from "react";
import classes from "./LocalGallery.module.css";
import { useAppSelector } from "@/lib/hooks";

/**
 * Displays a list of generated images stored in the local state.
 */
export default function LocalGallery() {
  const images = useAppSelector((state) => state.gallery.localImages);
  return images.length === 0 ? (
    <p className={classes.noImages}>No images generated yet.</p>
  ) : (
    <div className={classes.gallery}>
      {images.map((image, index) => (
        <div key={index} className={classes.imageContainer}>
          <Image
            className={classes.image}
            src={image}
            fill={true}
            sizes="25vw"
            alt="Generated image"
          />
        </div>
      ))}
    </div>
  );
}
