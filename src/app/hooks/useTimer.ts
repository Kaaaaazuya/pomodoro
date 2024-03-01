import { useCallback, useEffect, useState } from 'react'
import { Timer } from '../types/timer'
import { useCounter } from 'usehooks-ts'
import { TIMER_LENGTH } from '../components/Timer'

export const useTimer = () => {
  /** タイマーのカウントのsetIntervalのID */
  let timerCountInterval = 0

  const { count: key, increment: setKey } = useCounter(0)

  const [state, setState] = useState<Timer>({
    key,
    timeLeft: TIMER_LENGTH.work,
    isTimerOn: false,
    timerMode: 'work',
  })

  // アンマウント時にタイマーをクリアする
  useEffect(() => {
    return () => {
      clearInterval(timerCountInterval)
    }
  }, [timerCountInterval])

  /**
   * 開始/一時停止ボタンのアクション
   */
  const onButtonClick = () => {
    // 古いタイマーをリセットしておく
    clearInterval(timerCountInterval)

    setState((prevState) => {
      if (prevState.isTimerOn) {
        return { ...prevState, isTimerOn: false }
      } else {
        if (prevState.timeLeft <= 0) {
          // タイマーが0になった後で再開する場合、モードを切り替えてリセット
          const newState = toggleTimerMode(prevState)
          timerCountInterval = window.setInterval(() => {
            timerCount()
          }, 1000)
          return { ...newState, isTimerOn: true }
        } else {
          // タイマーがまだ残っている場合は、単に再開
          timerCountInterval = window.setInterval(() => {
            timerCount()
          }, 1000)
          return { ...prevState, isTimerOn: true }
        }
      }
    })
  }

  /**
   * タイマーのカウント処理
   * 0 秒になっているときは Mode を切り替え
   * それ以外の場合は、残り時間を減らす
   */
  const timerCount = () => {
    setState((state) => {
      if (state.timeLeft <= 0) {
        state = toggleTimerMode(state)
      }
      return { ...state, timeLeft: state.timeLeft - 1 }
    })
  }

  /**
   * タイマーの Mode の切り替え処理
   * @param state Timer の状態
   * @returns 切り替え後の Timer の状態
   */
  const toggleTimerMode = (state: Timer): Timer => {
    const timeLeft = state.timerMode === 'work' ? TIMER_LENGTH.break : TIMER_LENGTH.work
    const timerMode = state.timerMode === 'work' ? 'break' : 'work'
    return {
      ...state,
      timeLeft: timeLeft,
      timerMode: timerMode,
    }
  }

  /**
   * タイマーのリセット(任意のタイミングで実行可能)
   */
  const resetTimer = () => {
    clearInterval(timerCountInterval)

    setKey()
    setState({
      key,
      timeLeft: TIMER_LENGTH.work,
      isTimerOn: false,
      timerMode: 'work',
    })
  }

  /**
   * 完了時のアクション
   */
  const handleComplete = useCallback(() => {
    alert('complete')
  }, [])

  return { state, onButtonClick, timerCount, toggleTimerMode, resetTimer, handleComplete }
}
