import React from 'react'

import {Container, CircularProgress, Box, Paper} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';

interface LoadingTabProps {
  loading: boolean
}

const LoadingTab = (props: LoadingTabProps) => {
  let { loading } = props

  return (
    <Box
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1
      }}
    >
      <Paper 
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          border: '5px solid #e0e0e0',
          borderRadius: '20px',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {loading ? <CircularProgress size='24px'/> : <CircleIcon color='primary'/>}
      </Paper>
    </Box>
  )
}

export default LoadingTab