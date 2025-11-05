import { expect, test, beforeEach, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { createRoot, type Root } from 'react-dom/client'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

/**
 * Storyファイルを動的にインポート
 */
const storyFiles = import.meta.glob<{
  default: Meta
  [key: string]: StoryObj | Meta | unknown
}>('../../src/**/*.stories.tsx', { eager: true })

/**
 * Story情報の型定義
 */
interface StoryInfo {
  storyTitle: string
  storyName: string
  component: React.ComponentType<any>
  args: any
  id: string
  testId: string
}

/**
 * 全てのStoryを抽出してフラット化
 */
function extractStories(): StoryInfo[] {
  const stories: StoryInfo[] = []

  for (const [filePath, module] of Object.entries(storyFiles)) {
    try {
      // メタデータからtitleとコンポーネントを取得
      const meta = module.default as Meta
      const storyTitle = meta.title || 'Unknown'
      const component = meta.component

      if (!component) {
        console.warn(`コンポーネントが見つかりません: ${filePath}`)
        continue
      }

      // titleをファイル名に使えるように変換
      // "Components/Button" -> "Components-Button"
      const titleForFilename = storyTitle.replace(/\//g, '-')

      // コンポーネント名からtestIdを推測（最後のセグメント）
      const componentName = storyTitle.split('/').pop() || 'unknown'
      const testId = componentName.toLowerCase()

      // 各Storyを展開
      for (const [key, value] of Object.entries(module)) {
        if (key === 'default') continue

        const storyObj = value as StoryObj
        const tags = storyObj?.tags || []

        // 'skip-visual'タグで除外
        if (tags.includes('skip-visual')) continue

        stories.push({
          storyTitle,
          storyName: key,
          component,
          args: storyObj.args || {},
          id: `${titleForFilename}-${key}`,
          testId,
        })
      }
    } catch (error) {
      console.error(`Story の読み込みに失敗: ${filePath}`, error)
      continue
    }
  }

  return stories
}

/**
 * テストセットアップ
 */
let container: HTMLDivElement
let root: Root

beforeEach(() => {
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

/**
 * 各Storyのテスト生成
 */
const allStories = extractStories()

if (allStories.length === 0) {
  test('Story が見つかりません', () => {
    throw new Error('Story ファイルが存在しないか、読み込みに失敗しました')
  })
} else {
  test.each(allStories)(
    '$storyTitle - $storyName',
    async ({ component: Component, args, testId, id }) => {
      // Storyをargsを使ってレンダリング
      root.render(<Component {...args} />)

      // userEventのセットアップ
      await userEvent.setup()

      // DOMの更新を待機
      await new Promise((resolve) => setTimeout(resolve, 100))

      // ターゲット要素を取得
      const element = page.getByTestId(testId)

      // スナップショット取得
      await expect(element).toMatchScreenshot(id)
    }
  )
}
