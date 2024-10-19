// slices/musicUploadSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackName: "",
  artists: "",
  description: "",
  musicImage: null,
  selectedFile: null,
  forceAudio: "",
};

const musicUploadSlice = createSlice({
  name: "musicUpload",
  initialState,
  reducers: {
    setTrackName: (state, action) => {
      state.trackName = action.payload;
    },
    setArtists: (state, action) => {
      state.artists = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setMusicImage: (state, action) => {
      state.musicImage = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setForceAudio: (state, action) => {
      state.forceAudio = action.payload;
    },
  },
});

export const {
  setTrackName,
  setArtists,
  setDescription,
  setMusicImage,
  setSelectedFile,
  setForceAudio,
} = musicUploadSlice.actions;

export default musicUploadSlice.reducer;