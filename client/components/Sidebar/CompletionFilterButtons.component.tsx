import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'

import { showAll, showCompleted, showIncomplete } from '../../features/filter/filterSlice'

import { Button } from '@mui/material'
import ViewListIcon from '@mui/icons-material/ViewList'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import type { SxProps } from '@mui/material'

interface CompletionFiltersProps {
  numTodos: number, 
  numCompleted: number,
  numIncomplete: number
}

interface inputType {
  toggle: boolean,
  icon: JSX.Element,
  description: string,
  onClickHandler: () => void  
} 

interface inputTypes {
  all: inputType,
  completed: inputType,
  incomplete: inputType
}

const CompletionFilterButtons = (props: CompletionFiltersProps) => {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.filter.filterByCompletion)

  const inputs: inputTypes = {
    all: {
      toggle: filter === "all",
      icon: <ViewListIcon />,
      description: `All - ${props.numTodos}`,
      onClickHandler: () => {dispatch(showAll())}
    },
    completed: {
      toggle: filter === "completed",
      icon: <DoneAllIcon />,
      description: `Completed - ${props.numCompleted}`,
      onClickHandler: () => {dispatch(showCompleted())}
    },
    incomplete: {
      toggle: filter === "incomplete",
      icon: <HourglassBottomIcon />,
      description: `Incomplete - ${props.numIncomplete}`,
      onClickHandler: () => {dispatch(showIncomplete())}
    }
  }

  const order: string[] = ['all', 'completed', 'incomplete']

  const generateButtonProps = (props: inputType) => {
    const toggle = props.toggle
    const style: SxProps = Object.assign({
      pt: 1.5, pb: 1.5,
      borderRadius: 0
    }, toggle ? { // if toggle, add additional styling properties
      backgroundColor: '#e0e0e0',
      "&.MuiButtonBase-root:hover": { bgcolor: "#e0e0e0" }
    } : {}) 

    return {
      disableElevation: true,
      startIcon: props.icon,
      size: "large",
      sx: style,
      disableRipple: toggle,
      onClick: props.onClickHandler
    }
  }

  return (
    <>
      {order.map(o => {
        const description = inputs[o].description
        const buttonProps = generateButtonProps(inputs[o])
        return (
          <Button 
            key={o}
            disableElevation={buttonProps.disableElevation}
            startIcon={buttonProps.startIcon}
            size={buttonProps.size as any}
            sx={buttonProps.sx}
            disableRipple={buttonProps.disableRipple}
            onClick={buttonProps.onClick}
          >
            {description}
          </Button>
        )
      })}
    </>
  )
}

export default CompletionFilterButtons