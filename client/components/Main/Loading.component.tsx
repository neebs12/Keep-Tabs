import React from 'react'

import {Container, CircularProgress, Box, Paper} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';

const Loading = () => {
  return (
    <Container maxWidth='xs' sx={{
      display: 'flex',
      justifyContent: 'center',
      mt: 5
    }}>
      <CircularProgress size={200}/>
    </Container>
  );    
}

interface LoadingTabProps {
  loading: boolean
}

export const LoadingTab = (props: LoadingTabProps) => {
  const { loading } = props
  // if loading is true, show the Circle Icon
  // if loading is false, show the circular progress icon 
  return (
    <Box 
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: (theme) => theme.zIndex.modal + 1
      }}
    >
      <Paper variant="outlined" elevation={6}>
        <CircularProgress />
      </Paper>
    </Box>
  )
}

export default Loading