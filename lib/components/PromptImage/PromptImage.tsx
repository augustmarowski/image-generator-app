"use client";
import React from "react";
import classes from "./PromptImage.module.css";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";

/**
 * Displays the generated image when available using the next/image component.
 */
export default function PromptImage() {
  const { generatedImage } = useAppSelector((state) => state.generation);
  return (
    <div
      className={`${classes.imageContainer} ${
        generatedImage ? classes.show : ""
      }`}
    >
      {generatedImage && (
        <Image
          src={generatedImage}
          alt="Generated image"
          fill={true}
          className={classes.image}
        />
      )}
    </div>
  );
}
