import { TimerMode } from './timerMode'

/** タイマーに関する情報 */
export type Timer = {
  /** 経過時間 */
  timeLeft: number
  /** タイマー起動中の判定 */
  isTimerOn: boolean
  /** タイマーの状態 */
  timerMode: TimerMode
}
