import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'ボタンのバリアント',
    },
    children: {
      control: 'text',
      description: 'ボタンのテキスト',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: '今すぐ始める',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'キャンセル',
    variant: 'secondary',
  },
}

export const LongText: Story = {
  args: {
    children: 'これは非常に長いボタンテキストの例です',
    variant: 'primary',
  },
}
