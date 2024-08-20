import { AppThunk } from "../../store";
import { openApiKeyModal } from "../ApiKey/apiKeySlice";
import { WebSocketManager } from "@/lib/utils/WebSocketManager";

export const generateImageWithWebSocket =
  (prompt: string): AppThunk =>
  async (dispatch, getState) => {
    const { apiKey } = getState().apiKey;

    if (!apiKey) {
      dispatch(openApiKeyModal());
      return;
    }

    const webSocketManager = new WebSocketManager(apiKey, prompt, dispatch);
    webSocketManager.initializeWebSocket();
  };
