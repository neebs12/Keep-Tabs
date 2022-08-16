import React from 'react'

import { Divider, Drawer, Toolbar, Typography } from '@mui/material'


const drawerWidth = 240

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        // flexShrink: 0,
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      <Typography component="div" variant="h6">
        First Item List
      </Typography>
      <Divider />
      <Typography component="div" variant="h6">
        Second Item List
      </Typography>      
    </Drawer>
  )
}

export default Sidebar