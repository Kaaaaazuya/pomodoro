import { test, expect } from '@playwright/test'

// 各テストを実行する前に http://localhost:3000 に遷移する

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3001')
})

test('Pomodoro Timer が開始できること', async ({ page }) => {
  await page.goto('http://localhost:3001/')

  expect(await page.title()).toBe('Pomodoro Timer')

  await page.getByRole('button', { name: '開始' }).click()
  await expect(page.getByTestId('timerMode')).toContainText('作業')
})
