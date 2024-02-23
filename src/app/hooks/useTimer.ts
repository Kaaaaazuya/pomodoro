import { useEffect, useState } from 'react'
import { Timer } from '../types/timer'
import { TIMER_LENGTH } from '../page'

/** タイマーのカウントのsetIntervalのID */
let timerCountInterval = 0

export const useTimer = () => {
  const [state, setState] = useState<Timer>({
    timeLeft: TIMER_LENGTH.work,
    isTimerOn: false,
    timerMode: 'work',
  })

  useEffect(() => {
    return () => {
      clearInterval(timerCountInterval)
    }
  }, [])

  const onButtonClick = () => {
    setState((state) => {
      clearInterval(timerCountInterval)
      if (state.isTimerOn) {
        return {
          ...state,
          timeLeft: TIMER_LENGTH.work,
          timerMode: 'work',
          isTimerOn: false,
        }
      }
      timerCountInterval = window.setInterval(() => {
        timerCount()
      }, 1000)
      return { ...state, isTimerOn: true }
    })
  }

  const timerCount = () => {
    setState((state) => {
      if (state.timeLeft <= 0) {
        state = toggleTimerMode(state)
      }
      return { ...state, timeLeft: state.timeLeft - 1 }
    })
  }

  const toggleTimerMode = (state: Timer): Timer => {
    const timeLeft = state.timerMode === 'work' ? TIMER_LENGTH.break : TIMER_LENGTH.work
    const timerMode = state.timerMode === 'work' ? 'break' : 'work'
    return {
      ...state,
      timeLeft: timeLeft,
      timerMode: timerMode,
    }
  }

  return { state, onButtonClick, timerCount, toggleTimerMode }
}
