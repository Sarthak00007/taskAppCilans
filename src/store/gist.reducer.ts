import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoListState {
  isGistClicked: number[];
  isGistModalOpen: number | null;
}

const initialState: TodoListState = {
  isGistClicked: [],
  isGistModalOpen: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addGistIDToIsClicked: (state, action: PayloadAction<number>) => {
      if (!state.isGistClicked.includes(action.payload)) {
        state.isGistClicked?.push(action.payload);
      }
      state.isGistModalOpen = action.payload;
    },
    closeModel: (state) => {
      state.isGistModalOpen = null;
    },
  },
});

export const { addGistIDToIsClicked, closeModel } = counterSlice.actions;

export default counterSlice.reducer;
