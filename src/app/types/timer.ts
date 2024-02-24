import { TimerMode } from './timerMode'

/** タイマーに関する情報 */
export type Timer = {
  /** reset 用の key */
  key: number
  /** 経過時間 */
  timeLeft: number
  /** タイマー起動中の判定 */
  isTimerOn: boolean
  /** タイマーの状態 */
  timerMode: TimerMode
}
