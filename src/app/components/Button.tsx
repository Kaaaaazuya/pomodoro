import { ReactNode } from 'react'

type props = {
  onClick: () => void
  children: ReactNode
}

export const Button = ({ onClick, children }: props) => {
  return (
    <button onClick={onClick} type='button'>
      {children}
    </button>
  )
}
