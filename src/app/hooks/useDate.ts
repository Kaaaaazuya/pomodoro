import { useCallback } from 'react'

export const useDate = () => {
  const secondToMMSS = useCallback((second: number) => {
    const MM =
      second >= 10 * 60
        ? Math.floor(second / 60).toString()
        : second >= 1 * 60
          ? '0' + Math.floor(second / 60).toString()
          : '00'
    const SS = second % 60 >= 10 ? second % 60 : '0' + (second % 60)
    return MM + ':' + SS
  }, [])

  const formatTimeWithUnit = useCallback((second: number) => {
    if (second >= 3600) {
      // 1時間以上
      const hours = Math.floor(second / 3600)
      return `${hours} hour${hours > 1 ? 's' : ''}`
    } else if (second >= 60) {
      // 1分以上
      const minutes = Math.floor(second / 60)
      return `${minutes} minute${minutes > 1 ? 's' : ''}`
    } else {
      // それ以下
      return `${Math.floor(second)} second${second === 1 ? '' : 's'}`
    }
  }, [])

  return { secondToMMSS, formatTimeWithUnit }
}
