import { VirtualElement } from '@popperjs/core'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'

import ClickAwayListener from 'react-click-away-listener'

import './styles.css'

export type PopoverProps = {
  referenceElement: Element | VirtualElement | null
  open: boolean
  onClose?: () => void
}

const Popover:FC<PopoverProps> = ({
  referenceElement,
  children,
  open,
  onClose,
  ...rest
}) => {
  const popoverRef = useRef(null)
  const { styles, attributes } = usePopper(referenceElement, popoverRef.current)

  const [visibility, setVisibility] = useState<'visible'|'hidden'>('hidden')

  const handleClose = useCallback(() => {
    if (visibility === 'visible') {
      if (onClose) {
        onClose()
      } else {
        setVisibility('hidden')
      }
    }
  }, [visibility])

  useEffect(() => {
    setVisibility(open ? 'visible' : 'hidden')
  }, [open])

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div
        ref={popoverRef}
        style={{ ...styles.popper, visibility }}
        {...rest}
        {...attributes.popper}
      >
        <div className='paper'>
              {children}
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default Popover
