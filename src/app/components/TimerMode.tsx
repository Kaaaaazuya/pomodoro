import { Timer } from '../types/timer'

type props = {
  state: Timer
}

export const TimerMode = ({ state }: props) => {
  return <div data-testid='timerMode'>{state.timerMode === 'work' ? '作業' : '休憩'}</div>
}
