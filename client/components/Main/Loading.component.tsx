import React from 'react'

import {Container, CircularProgress} from '@mui/material'

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

export default Loading