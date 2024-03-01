import { Button } from './Button'
import Image from 'next/image'
import * as stop from '../../../public/stop.png'
import * as start from '../../../public/start.png'
import * as pause from '../../../public/pause.png'
import { Timer } from '../types/timer'
import { css } from '../../../styled-system/css'

type props = {
  state: Timer
  onButtonClick: () => void
  resetTimer: () => void
}

export const Controller = ({ onButtonClick, state, resetTimer }: props) => {
  return (
    <div
      className={css({
        display: 'flex',
        gap: '16',
      })}
    >
      <Button onClick={onButtonClick}>
        {state.isTimerOn ? (
          <Image alt='一時停止' height='48' src={pause} width='48' />
        ) : (
          <Image alt='開始' height='48' src={start} width='48' />
        )}
      </Button>
      <Button onClick={resetTimer}>
        <Image alt='停止' height='48' src={stop} width='48' />
      </Button>
    </div>
  )
}
