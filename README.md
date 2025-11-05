# Vitest Visual Regression Testing + Storybook サンプル

このプロジェクトは、Vitest の Visual Regression Testing (VRT) 機能と Storybook を統合したデモンストレーションです。

## 概要

Vitest のブラウザモードと Playwright を使用して、Storybook の Story 単位で React コンポーネントのスクリーンショットを自動的に比較し、UI の変更を検知します。

## セットアップ

### 1. 依存パッケージのインストール

```bash
pnpm install
```

### 2. Playwright ブラウザのインストール

```bash
./node_modules/.bin/playwright install chromium
```

## 使い方

### Storybook の起動

```bash
pnpm storybook
```

ブラウザで `http://localhost:6006/` にアクセスして、コンポーネントカタログを確認できます。

### VRT テストの実行

```bash
pnpm test:visual
```

すべての Story に対して自動的にスクリーンショットテストが実行されます。

### ベースライン画像の更新

UI を意図的に変更した場合、以下のコマンドでベースライン画像を更新します。

```bash
pnpm test:visual:update
```

## プロジェクト構成

```
.
├── .storybook/
│   ├── main.ts               # Storybook 設定
│   └── preview.tsx           # グローバルデコレーター
├── src/
│   └── components/
│       ├── Button.tsx        # ボタンコンポーネント
│       ├── Button.stories.tsx # Button の Story
│       ├── Card.tsx          # カードコンポーネント
│       └── Card.stories.tsx  # Card の Story
├── tests/
│   └── visual/
│       ├── __screenshots__/  # ベースライン画像
│       └── stories.test.tsx  # Story 単位の VRT テストファイル
├── vitest.config.ts          # Vitest 設定
└── package.json
```

## 主な機能

### テスト対象コンポーネント

1. **Button** - プライマリとセカンダリの 2 つのバリアントを持つボタン（3 つの Story）
2. **Card** - タイトルと説明を表示するカードコンポーネント（3 つの Story）

### Storybook + VRT 統合の仕組み

1. Storybook で CSF3 形式で Story を定義
2. `stories.test.tsx` が `import.meta.glob` で全 Story ファイルを自動検出
3. 各 Story の `meta.component` と `args` を取得
4. Story ごとに React コンポーネントをレンダリング
5. Playwright を使用してスクリーンショットを撮影
6. `__screenshots__` ディレクトリ内のベースライン画像と比較
7. 差分があれば `.vitest-attachments` に diff 画像を出力

### 自動化のメリット

- **Story を追加するだけで自動的に VRT が実行される**
- Story と VRT が一元管理され、テストコードの重複がない
- Storybook でコンポーネントを視覚的に確認しながら開発可能

## 設定

### vitest.config.ts

- **ブラウザ**: Chromium
- **ビューポート**: 1280x720
- **プロバイダー**: Playwright

### スクリーンショットの命名規則

スクリーンショットは以下の形式で保存されます：

```
{Story の title (/ を - に置換)}-{Story 名}-{ブラウザ名}-{プラットフォーム}.png
```

例:
- `Components-Button-Primary-chromium-darwin.png`
- `Components-Card-Default-chromium-darwin.png`

この命名規則により、コンポーネント名が重複しても一意なファイル名が保証されます。

### Story のフィルタリング

特定の Story を VRT から除外したい場合は、`tags: ['skip-visual']` を追加します：

```typescript
export const WithInteraction: Story = {
  args: { children: 'クリック' },
  tags: ['skip-visual'], // VRT から除外
}
```

## 公式ドキュメント

- Vitest VRT: https://vitest.dev/guide/browser/visual-regression-testing.html
- Storybook: https://storybook.js.org/
