import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

export type CompletionFilter = "all" | "completed" | "incomplete"

export interface FilterState {
  filterByCompletion: CompletionFilter, 
  filterBySearch: string
}

const initialState: FilterState = {
  filterByCompletion: "all",
  filterBySearch: ''
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
    },
    applySearchFilter: (state, action: PayloadAction<string>) => {
      state.filterBySearch = action.payload
    }
  }
})

export const { showAll, showCompleted, showIncomplete, applySearchFilter } = filterSlice.actions

export default filterSlice.reducer