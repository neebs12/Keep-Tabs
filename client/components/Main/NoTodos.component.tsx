import React from 'react'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { showNewTodoModal } from '../../features/modal/modalSlice'

import { Button, Container, List, Typography } from '@mui/material'

import NoteAddIcon from '@mui/icons-material/NoteAdd'

const NoTodos = () => {
  const dispatch = useAppDispatch()
  const searchFilter = useAppSelector(state => state.filter.filterBySearch)

  return (
    <Container 
      maxWidth='xs' 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mt: 5
      }}
    >
      <Typography variant='h5' component='div' sx={{textAlign:'center'}}>
        Make a new Todo today!
      </Typography>
      <Button 
        onClick={() => {dispatch(showNewTodoModal())}}
        variant="contained" 
        disableElevation={true} 
        startIcon={<NoteAddIcon />} 
        size="large" 
        sx={{
          mt: 1, mb: 1,
          borderRadius: '20px'
        }}
      > Add New Todo </Button>
      {searchFilter && <Typography variant='h6' component='div' sx={{textAlign:'center', overflow: 'hidden'}}>
        {`No matches 😔: '${searchFilter}'`}
      </Typography>}      
    </Container>
  )  
}

export default NoTodos