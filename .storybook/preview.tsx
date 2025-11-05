import type { Preview } from '@storybook/react'
import React from 'react'

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
}

export default preview
