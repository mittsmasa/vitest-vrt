import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // Storyファイルの検出パターン
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  // 使用するアドオン
  addons: [],

  // フレームワーク設定（Vite + React）
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  // TypeScriptサポート
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },

  // ドキュメント設定
  docs: {},
}

export default config
