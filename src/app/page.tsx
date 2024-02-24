'use client'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useDate } from './hooks/useDate'
import { useTimer } from './hooks/useTimer'
import { css } from '../../styled-system/css'
import { Button } from './components/Button'
import Image from 'next/image'
import * as stop from '../../public/stop.png'
import * as start from '../../public/start.png'
import * as pause from '../../public/pause.png'
import { useMemo } from 'react'

/** タイマーの長さ */
export const TIMER_LENGTH = { work: 30, break: 5 * 60 } as const

const timerProps = {
  isPlaying: false,
  size: 300,
  strokeWidth: 6,
}

const App = () => {
  const { formatTimeWithUnit } = useDate()
  const { state, onButtonClick, resetTimer, handleComplete } = useTimer()

  const isWorking = useMemo(() => {
    return state.timerMode === 'work'
  }, [state.timerMode])

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
      })}
    >
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
      <main
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        })}
      >
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

        <div data-testid='timerMode'>{state.timerMode === 'work' ? '作業' : '休憩'}</div>
      </main>
    </div>
  )
}

export default App
