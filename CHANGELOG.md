# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/ja/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/lang/ja/).

## [1.0.0] - 2025-01-18

### Added
- 初回リリース
- 背景画像のアップロード機能（PNG, JPEG, GIF, WebP対応）
- 画像サイズの自動検出
- リアルタイムプレビュー機能
- 数字の位置調整（X/Y座標）
- 数字のサイズ調整（50%〜500%）
- 数字の色設定
- 数字の回転（-45°〜45°）
- テキストシャドウ設定
- Google Fonts対応（5種類）
- ローカルフォント対応（Local Font Access API）
- カンマ表示の切り替え
- プレビュー数値の任意指定（0〜9,999,999）
- CSS再生成ボタン
- CSSコピー機能
- テスト用HTML出力機能
- 設定の自動保存（localStorage）
- テンプレート背景（3種類）
- レスポンシブデザイン
- プライバシーポリシー

### Security
- すべての処理をブラウザ内で完結（サーバー送信なし）
- 画像データは保存しない設計
