# Vitest Visual Regression Testing サンプル

このプロジェクトは、Vitest の Visual Regression Testing (VRT) 機能のデモンストレーションです。

## 概要

Vitest のブラウザモードと Playwright を使用して、React コンポーネントのスクリーンショットを自動的に比較し、UI の変更を検知します。

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

### VRT テストの実行

```bash
pnpm test:visual
```

### ベースライン画像の更新

UI を意図的に変更した場合、以下のコマンドでベースライン画像を更新します。

```bash
pnpm test:visual:update
```

## プロジェクト構成

```
.
├── src/
│   └── components/
│       ├── Button.tsx        # ボタンコンポーネント
│       └── Card.tsx          # カードコンポーネント
├── tests/
│   └── visual/
│       ├── __screenshots__/  # ベースライン画像
│       └── example.test.tsx  # VRT テストファイル
├── vitest.config.ts          # Vitest 設定
└── package.json
```

## 主な機能

### テスト対象コンポーネント

1. **Button** - プライマリとセカンダリの 2 つのバリアントを持つボタン
2. **Card** - タイトルと説明を表示するカードコンポーネント

### VRT の仕組み

1. 各テストで React コンポーネントをレンダリング
2. Playwright を使用してスクリーンショットを撮影
3. `__screenshots__` ディレクトリ内のベースライン画像と比較
4. 差分があれば `.vitest-attachments` に diff 画像を出力

## 設定

### vitest.config.ts

- **ブラウザ**: Chromium
- **ビューポート**: 1280x720
- **プロバイダー**: Playwright

### スクリーンショットの命名規則

スクリーンショットは以下の形式で保存されます：

```
{テスト名}-{ブラウザ名}-{プラットフォーム}.png
```

例: `button-chromium-darwin.png`

## 公式ドキュメント

https://vitest.dev/guide/browser/visual-regression-testing.html
