import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";

type GalleryState = {
  localImages: string[];
};

const initialState: GalleryState = {
  localImages: [],
};

export const gallerySlice = createAppSlice({
  name: "gallery",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      state.localImages = [action.payload, ...state.localImages];
    },
  },
});

export const { addImage } = gallerySlice.actions;
export default gallerySlice.reducer;
