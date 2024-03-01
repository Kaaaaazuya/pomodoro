import { ReactNode } from 'react'
import { css } from '../../../styled-system/css'

type props = {
  onClick: () => void
  children: ReactNode
}

export const Button = ({ onClick, children }: props) => {
  return (
    <button className={css({ cursor: 'pointer' })} onClick={onClick} type='button'>
      {children}
    </button>
  )
}
