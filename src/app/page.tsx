'use client'
import { useDate } from './hooks/useDate'
import { useTimer } from './hooks/useTimer'

/** タイマーの長さ */
export const TIMER_LENGTH = { work: 25 * 60, break: 5 * 60 } as const

const App = () => {
  const { secondToMMSS } = useDate()
  const { state, onButtonClick } = useTimer()

  return (
    <>
      <div data-testid='timeLeft'>{secondToMMSS(state.timeLeft)}</div>
      <button data-testid='timerButton' onClick={onButtonClick} type='button'>
        {state.isTimerOn ? '停止' : '開始'}
      </button>
      <div data-testid='timerMode'>{state.timerMode === 'work' ? '作業' : '休憩'}</div>
    </>
  )
}

export default App
