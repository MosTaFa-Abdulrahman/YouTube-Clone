import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isFetching: false,
    error: false,
  },

  reducers: {
    // ADD
    addCommentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.comments.push(action.payload);
    },
    addCommentFaulire: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE
    deleteCommentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.comments.splice(
        state.comments.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCommentFauilure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  addCommentStart,
  addCommentSuccess,
  addCommentFaulire,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFauilure,
} = commentSlice.actions;

export default commentSlice.reducer;
