import { useCallback, useEffect, useRef, useState } from 'react'
import { Timer } from '../types/timer'
import { TIMER_LENGTH } from '../components/Timer'

export const useTimer = () => {
  /** タイマーのカウントのsetIntervalのID */
  const timerCountInterval = useRef<ReturnType<typeof setTimeout> | null>(null)

  const key = useRef<number>(0)

  const [state, setState] = useState<Timer>({
    key: key.current,
    timeLeft: TIMER_LENGTH.work,
    isTimerOn: false,
    timerMode: 'work',
  })

  // アンマウント時にタイマーをクリアする
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (timerCountInterval.current) clearInterval(timerCountInterval.current)
    }
  }, [])

  /**
   * タイマーの Mode の切り替え処理
   * @param state Timer の状態
   * @returns 切り替え後の Timer の状態
   */
  const toggleTimerMode = useCallback((prevState: Timer): Timer => {
    const isWorkMode = prevState.timerMode === 'work'
    return {
      ...prevState,
      timeLeft: isWorkMode ? TIMER_LENGTH.break : TIMER_LENGTH.work,
      timerMode: isWorkMode ? 'break' : 'work',
    }
  }, [])

  /**
   * タイマーのカウント処理
   * 0 秒になっているときは Mode を切り替え
   * それ以外の場合は、残り時間を減らす
   */
  const timerCount = useCallback(() => {
    setState((currentState) => {
      let newState = { ...currentState }
      if (currentState.timeLeft <= 0) {
        newState = toggleTimerMode(currentState)
      } else {
        newState.timeLeft -= 1
      }
      return newState
    })
  }, [toggleTimerMode])

  /**
   * 開始/一時停止ボタンのアクション
   */
  const onButtonClick = useCallback(() => {
    if (state.isTimerOn) {
      if (timerCountInterval.current) clearInterval(timerCountInterval.current)
      setState((prevState) => ({ ...prevState, isTimerOn: false }))
    } else {
      timerCountInterval.current = setInterval(timerCount, 1000)
      setState((prevState) => ({ ...prevState, isTimerOn: true }))
    }
  }, [state.isTimerOn, timerCount])

  /**
   * タイマーのリセット(任意のタイミングで実行可能)
   */
  const resetTimer = useCallback(() => {
    if (timerCountInterval.current) clearInterval(timerCountInterval.current)

    key.current = key.current + 1
    setState({
      key: key.current,
      timeLeft: TIMER_LENGTH.work,
      isTimerOn: false,
      timerMode: 'work',
    })
  }, [key])

  /**
   * 完了時のアクション
   */
  const handleComplete = useCallback(() => {
    alert('complete')
  }, [])

  return { state, onButtonClick, timerCount, toggleTimerMode, resetTimer, handleComplete }
}
