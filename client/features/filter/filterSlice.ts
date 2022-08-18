import { createSlice } from '@reduxjs/toolkit'

export type CompletionFilter = "all" | "completed" | "incomplete"

export interface FilterState {
  filterByCompletion: CompletionFilter, 
}

const initialState: FilterState = {
  filterByCompletion: "all"
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    showAll: (state) => {
      state.filterByCompletion = "all"
    },
    showCompleted: (state) => {
      state.filterByCompletion = "completed"
    },
    showIncomplete: (state) => {
      state.filterByCompletion = "incomplete"
    }
  }
})

export const { showAll, showCompleted, showIncomplete } = filterSlice.actions

export default filterSlice.reducer