import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";

interface GenerationState {
  prompt: string;
  status: "idle" | "loading" | "error";
  errorMessage: string;
  retryCount: number;
  generatedImage: string | null;
  progress: number | null;
}

const initialState: GenerationState = {
  prompt: "",
  status: "idle",
  errorMessage: "",
  retryCount: 0,
  generatedImage: null,
  progress: null,
};

export const generationSlice = createAppSlice({
  name: "generation",
  initialState,
  reducers: {
    setPrompt: (state, action: PayloadAction<GenerationState["prompt"]>) => {
      state.prompt = action.payload;
      state.status = "loading";
      state.progress = null;
    },
    setStatus: (state, action: PayloadAction<GenerationState["status"]>) => {
      state.status = action.payload;
    },
    setImage: (
      state,
      action: PayloadAction<GenerationState["generatedImage"]>
    ) => {
      state.generatedImage = action.payload;
    },
    setProgress: (
      state,
      action: PayloadAction<GenerationState["progress"]>
    ) => {
      state.progress = action.payload;
    },
    setErrorMessage(
      state,
      action: PayloadAction<GenerationState["errorMessage"]>
    ) {
      state.errorMessage = action.payload;
    },
    incrementRetryCount(state) {
      state.retryCount += 1;
    },
    resetRetryCount(state) {
      state.retryCount = 0;
    },
    clearPrompt: (state) => {
      state.prompt = "";
      state.errorMessage = "";
      state.status = "idle";
      state.generatedImage = null;
      state.progress = null;
    },
  },
});

export const {
  setPrompt,
  setStatus,
  setImage,
  setProgress,
  clearPrompt,
  setErrorMessage,
  incrementRetryCount,
  resetRetryCount,
} = generationSlice.actions;

export default generationSlice.reducer;
