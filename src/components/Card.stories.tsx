import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'カードのタイトル',
    },
    description: {
      control: 'text',
      description: 'カードの説明文',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '高速',
    description: 'Vitest の高速な実行エンジンで、VRT もすばやく完了します。',
  },
}

export const LongDescription: Story = {
  args: {
    title: '詳細な機能説明',
    description:
      'これは非常に長い説明文の例です。Vitestは最新のJavaScriptテストフレームワークであり、Viteをベースにした超高速なテスト実行環境を提供します。HMRのような即座のフィードバックが得られ、開発体験が大幅に向上します。',
  },
}

export const Short: Story = {
  args: {
    title: 'VRT',
    description: 'ビジュアルリグレッションテスト',
  },
}
