import React from 'react'

import { useAppSelector } from '../../hooks'

import { Box, Toolbar } from '@mui/material'

import ModalForm from './ModalForm.index'
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

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        {/* Modal, TODO: will be a modal manager later*/}
        <ModalForm show={showNewTodoModal} />
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