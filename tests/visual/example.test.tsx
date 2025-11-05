import { expect, test, afterEach, beforeEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { createRoot, type Root } from 'react-dom/client'
import { Button } from '../../src/components/Button'
import { Card } from '../../src/components/Card'

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  // 既存のコンテナをクリア
  document.body.innerHTML = ''

  container = document.createElement('div')
  container.setAttribute('id', 'root')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  root.unmount()
  container.remove()
})

test('ボタンが正しく表示される', async () => {
  root.render(<Button>今すぐ始める</Button>)

  await userEvent.setup()
  const button = page.getByTestId('button')
  await expect(button).toMatchScreenshot('button')
})

test('セカンダリボタンが正しく表示される', async () => {
  root.render(<Button variant="secondary">キャンセル</Button>)

  await userEvent.setup()
  const button = page.getByTestId('button')
  await expect(button).toMatchScreenshot('button-secondary')
})

test('カードが正しく表示される', async () => {
  root.render(
    <Card
      title="高速"
      description="Vitest の高速な実行エンジンで、VRT もすばやく完了します。"
    />
  )

  await userEvent.setup()
  const card = page.getByTestId('card')
  await expect(card).toMatchScreenshot('card')
})
