import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { hideNewTodo } from '../../features/modal/modalSlice'

import { Box, Button, Typography, Toolbar, Modal } from '@mui/material'

import Header from '../Header/Header.index'
import Sidebar from '../Sidebar/Sidebar.index'

type LayoutProps = {
  // Inspiration: https://www.carlrippon.com/react-children-with-typescript/
  children: React.ReactNode
}

// This will contain the 
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const id = useAppSelector(state => state.session.id)
  const showNewTodoModal = useAppSelector(state => state.modal.newTodo) 

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const MyModal = () => {
    const dispatch = useAppDispatch()
    const handleOnClose = () => {
      // plus, 
      dispatch(hideNewTodo())
      // setOpenState(false)
    }

    return (
      <Modal
        open={showNewTodoModal}
        onClose={handleOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"        
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>        
      </Modal>
    )
  }

  return (
    <div>
      <Box sx={{
        display: 'flex'
      }}>
        {/* Modal */}
        <MyModal />
        {/* header */}
        <Header />
        {/* sidebar, optionally rendered */}
        {id && <Sidebar /> } 
        <Box component="main" maxWidth="xs" sx={{flexGrow: 1}}>
          <Toolbar />
          { children }
        </Box>
      </Box>
    </div>
  )
}

export default Layout