import { addImage } from "../features/Gallery/gallerySlice";
import {
  setImage,
  setPrompt,
  setStatus,
  setProgress,
  resetRetryCount,
  setErrorMessage,
} from "../features/Generation/generationSlice";
import { BrowserImage } from "@/lib/utils/BrowserImage";
import config from "@/lib/config";

const MAX_RETRY_COUNT = 3;

export class WebSocketManager {
  private socket!: WebSocket;
  private retryCount: number = 0;

  constructor(
    private apiKey: string,
    private prompt: string,
    private dispatch: any
  ) {}

  public initializeWebSocket() {
    const webSocketUrl = new URL(config.webSocketUrl);
    webSocketUrl.searchParams.append("token", this.apiKey);

    this.socket = new WebSocket(webSocketUrl.toString());
    this.addEventListeners();
    this.dispatch(setPrompt(this.prompt));
    this.dispatch(setErrorMessage(""));
  }

  private addEventListeners() {
    this.socket.onopen = () => this.handleOpen();
    this.socket.onmessage = (event: MessageEvent) => this.handleMessage(event);
    this.socket.onerror = () => this.handleError();
    this.socket.onclose = (event: CloseEvent) => this.handleClose(event);
  }

  private handleOpen() {
    this.socket.send(
      JSON.stringify({
        prompt: this.prompt,
      })
    );
  }

  private async handleMessage(event: MessageEvent) {
    const data = JSON.parse(event.data) as {
      completed: boolean;
      image: string;
      prompt: string;
      step: number;
    };

    if (data.image) {
      const { url, blob } = await new BrowserImage().updateImage(data.image);
      this.dispatch(setProgress(Math.floor((data.step / 100) * 100)));
      this.dispatch(resetRetryCount());
      this.dispatch(setImage(url));

      if (data.completed) {
        this.dispatch(addImage(url));
        this.dispatch(setProgress(null));
        this.dispatch(setStatus("idle"));
      }
    }
  }

  private handleError() {
    this.dispatch(setStatus("error"));
    this.dispatch(setErrorMessage("WebSocket error occurred"));
  }

  private handleClose(event: CloseEvent) {
    const { code } = event;
    const errorMessages: { [key: number]: string } = {
      1000: "",
      1003: "Error: Invalid prompt",
      3000: "Unauthorized: Invalid API key",
      3003: "Error: Something went wrong",
      1011: "Error: Something went wrong",
      1013: "Error: Resource temporarily unavailable",
      3008: "Error: Resource temporarily unavailable",
      400: "Error: Bad request",
    };

    if (errorMessages[code] !== undefined) {
      this.dispatch(setStatus("error"));
      this.dispatch(setErrorMessage(errorMessages[code]));
    } else {
      this.dispatch(setStatus("error"));
      this.dispatch(setErrorMessage("Error: Failed to generate image"));
    }

    if ([1013, 3008].includes(code) && this.retryCount < MAX_RETRY_COUNT) {
      this.retryCount += 1;
      this.initializeWebSocket(); // Retry connection
    } else if (this.retryCount >= MAX_RETRY_COUNT) {
      this.dispatch(setErrorMessage("Max retry limit reached"));
    }
  }
}
