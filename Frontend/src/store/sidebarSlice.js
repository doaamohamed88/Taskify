import { createSlice } from "@reduxjs/toolkit"

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    collapsed: false,
  },
  reducers: {
    toggleSidebar(state) {
      state.collapsed = !state.collapsed
    },
  },
})

export const { toggleSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
