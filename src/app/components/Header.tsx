import { css } from '../../../styled-system/css'

export const Header = () => {
  return (
    <header>
      <h1
        className={css({
          fontSize: 48,
          fontWeight: 'bold',
        })}
      >
        pomodoro timer
      </h1>
    </header>
  )
}
