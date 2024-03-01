'use client'
import { useTimer } from './hooks/useTimer'
import { css } from '../../styled-system/css'
import { useMemo } from 'react'
import { Header } from './components/Header'
import { Timer } from './components/Timer'
import { Controller } from './components/Controller'
import { TimerMode } from './components/TimerMode'

/** タイマーの長さ */

const App = () => {
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
      <Header />

      <main
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        })}
      >
        <Timer handleComplete={handleComplete} isWorking={isWorking} state={state} />
        <Controller onButtonClick={onButtonClick} resetTimer={resetTimer} state={state} />
        <TimerMode state={state} />
      </main>
    </div>
  )
}

export default App
