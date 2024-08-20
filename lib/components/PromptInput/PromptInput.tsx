"use client";
import React, { useState } from "react";
import classes from "./PromptInput.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { generateImageWithWebSocket } from "@/lib/features/Generation/generationThunks";

const PROMPT_MAX_LENGTH = 100;

/**
 * Renders a form for user input with a prompt textarea and a generate button.
 * Dispatches a generateImageWithWebSocket action when the form is submitted.
 * Displays a loading indicator with progress percentage while the image is being generated.
 * Displays an error message if the generation fails.
 */
export default function PromptInput() {
  const dispatch = useAppDispatch();
  const { status, progress, generatedImage, errorMessage } = useAppSelector(
    (state) => state.generation
  );

  const [form, setForm] = useState({
    prompt: "A surrealistic painting of a cat, sitting on a beach at sunset.",
    error: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(generateImageWithWebSocket(form.prompt));
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.inputContainer}>
        <label htmlFor="prompt" className={classes.promptLabel}>
          Prompt
        </label>
        <textarea
          id="prompt"
          className={generatedImage ? classes.promptWithImage : ""}
          maxLength={PROMPT_MAX_LENGTH}
          value={form.prompt}
          onChange={(e) => setForm({ ...form, prompt: e.target.value })}
          placeholder="Enter your prompt"
          disabled={status === "loading"}
        />
        <p className={classes.promptLength}>
          {form.prompt.length}/{PROMPT_MAX_LENGTH}
          {(form.error || errorMessage) && (
            <span className={classes.errorText}>
              {form.error || errorMessage}
            </span>
          )}
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className={classes.generateButton}
        >
          {status === "loading"
            ? `Generating... ${progress || 0}%`
            : "Generate"}
        </button>
      </div>
    </form>
  );
}
