import React, { useState } from 'react'

import { TodoFromModal } from '../../types/todos.types'

import { Box, Button, Typography, Modal, TextField, CssBaseline, Switch, FormGroup, FormControlLabel } from '@mui/material'

interface ModalGenericProps {
  modalTitleIcon: JSX.Element
  modalTitle: string
  titleInput: string
  descriptionInput: string
  completionInput: boolean
  submissionCb: (obj: TodoFromModal) => void  
  closeCb: () => void
} 

const ModalGeneric = (props: ModalGenericProps) => {
  const [title, setTitle] = useState<string>(props.titleInput)
  const [description, setDescription] = useState<string>(props.descriptionInput)
  const [completed, setCompleted] = useState<boolean>(props.completionInput)  
  const [localView, setLocalView] = useState<boolean>(true)

  const handleOnClose = () => {
    // resets modal state
    setTitle('')  
    setDescription('')
    setCompleted(false) 
    // closes modal from viewport   
    setLocalView(false) 
    // closes modal from redux store perspective
    props.closeCb() 
  }

  const style = {
    position: 'absolute' as 'absolute',
    // moves top-left corner to center of screen
    top: '50%', left: '50%', 
    // transforms element compared to itself be at center of the screen
    transform: 'translate(-50%, -50%)', 
    width: 400,
    // references the theme
    bgcolor: 'background.paper',
    border: '2px solid #e0e0e0',
    borderRadius: '20px',
    boxShadow: 24,
    // padding
    p: 4,
  } 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const todoSubmit: TodoFromModal = {
      title, description, completed
    }
    props.submissionCb(todoSubmit)
    // resets modal state
    setTitle('')  
    setDescription('')
    setCompleted(false) 
    // closes modal from viewport   
    setLocalView(false)     
  }

  return (    
    <Modal
      open={localView} // temp
      onClose={handleOnClose}
      // linked id for the title
      aria-labelledby="modal-modal-title"
      // linked id for the description
      aria-describedby="modal-modal-description"        
    >
      <Box sx={{...style}}>
        <CssBaseline />
          <Box id="modal-modal-title" sx={{display: 'flex'}}>
            {props.modalTitleIcon}
            <Typography variant="h6" component="h2" sx={{mt: 0.5, ml: 1}}>
              {props.modalTitle}
            </Typography>
          </Box>      
          <Box 
            component='form' 
            // sets all margins to 1
            sx={{ '& .MuiTextField-root': { m: 1 } }} 
            onSubmit={handleSubmit}
          >     
            <TextField
              required 
              fullWidth
              variant='standard'
              id='todo-title'
              name='todo-title'
              label='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextField 
              required 
              fullWidth
              multiline
              variant='standard'
              rows={4}
              id='todo-description'
              name='todo-description'              
              label='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <FormGroup>
              <FormControlLabel control={
                  <Switch checked={completed} onChange={() => setCompleted(s => !s)}/>}
                label='Completed'
              />
            </FormGroup>

            <Box sx={{mt: 1, display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
              <Button
                disableElevation
                variant='contained'
                type='submit'
                disabled={!(title && description)}
              >Submit</Button>
            </Box>                 
          </Box>
      </Box>
    </Modal>
    )
}

export default ModalGeneric