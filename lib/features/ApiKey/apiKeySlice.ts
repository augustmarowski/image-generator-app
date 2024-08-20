import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";

interface ApiKeyState {
  apiKey: string | null;
  isApiKeyStored: boolean;
  displayApiKeyModal: boolean;
}

// Retrieve the API key from local storage if it exists
const apiKey =
  typeof window !== "undefined" ? localStorage.getItem("apiKey") : null;

const initialState: ApiKeyState = {
  apiKey: apiKey,
  isApiKeyStored: !!apiKey,
  displayApiKeyModal: false,
};

export const apiKeySlice = createAppSlice({
  name: "apiKey",
  initialState,
  reducers: {
    setApiKey(
      state,
      action: PayloadAction<{
        apiKey: string;
        store: boolean;
      }>
    ) {
      state.apiKey = action.payload.apiKey;
      if (action.payload.store) {
        localStorage.setItem("apiKey", action.payload.apiKey);
        state.isApiKeyStored = true;
      } else {
        state.isApiKeyStored = false;
        localStorage.removeItem("apiKey");
      }
      state.displayApiKeyModal = false;
    },
    openApiKeyModal(state) {
      state.displayApiKeyModal = true;
    },
    closeApiKeyModal(state) {
      state.displayApiKeyModal = false;
    },
    clearApiKey(state) {
      localStorage.removeItem("apiKey");
      state.apiKey = null;
      state.isApiKeyStored = false;
    },
  },
});

export const { setApiKey, clearApiKey, openApiKeyModal, closeApiKeyModal } =
  apiKeySlice.actions;
export default apiKeySlice.reducer;
