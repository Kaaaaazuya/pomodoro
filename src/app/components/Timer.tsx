import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useDate } from '../hooks/useDate'
import { Timer as TimerType } from '../types/timer'
import { css } from '../../../styled-system/css'

export const TIMER_LENGTH = { work: 25 * 60, break: 5 * 60 } as const

const timerProps = {
  isPlaying: false,
  size: 300,
  strokeWidth: 6,
}

type props = {
  isWorking: boolean
  state: TimerType
  handleComplete: () => void
}

export const Timer = ({ isWorking, state, handleComplete }: props) => {
  const { formatTimeWithUnit } = useDate()

  return (
    <CountdownCircleTimer
      {...timerProps}
      colors={isWorking ? '#D14081' : '#218380'}
      duration={isWorking ? TIMER_LENGTH['work'] : TIMER_LENGTH['break']}
      isPlaying={state.isTimerOn}
      key={state.key}
      onComplete={handleComplete}
    >
      {({ elapsedTime }) => (
        <span
          className={css({
            fontSize: 24,
            color: isWorking ? '#D14081' : '#218380',
          })}
        >
          {formatTimeWithUnit(TIMER_LENGTH[state.timerMode] - elapsedTime)}
        </span>
      )}
    </CountdownCircleTimer>
  )
}
