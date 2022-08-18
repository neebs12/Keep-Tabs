import React, { useState } from 'react'

import { useAppDispatch } from '../../hooks'
import { applySearchFilter } from '../../features/filter/filterSlice'

import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import { IconButton } from '@mui/material'

// HEAVILY inspired by: https://mui.com/material-ui/react-app-bar/
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(7),
  width: '50%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  display: 'flex',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon (NOTE: this is MUI comment)
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const SearchBar = () => {
  const [query, setQuery] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleOnChange = (e) => {
    console.log(query)
    setQuery(e.target.value)
    dispatch(applySearchFilter(e.target.value))
  }

  const handleOnClick = () => {
    setQuery('')
    dispatch(applySearchFilter(''))
  }

  return(
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleOnChange}
          value={query}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      {query && <IconButton color="inherit" onClick={handleOnClick}>
        <CancelIcon />
      </IconButton>}
    </>
  )
}

export default SearchBar