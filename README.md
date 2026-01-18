# YouTube登録者数カウンターCSS生成ツール

YouTube Analyticsの登録者数カウンターをカスタマイズするためのCSSを、簡単に生成できるWebアプリケーションです。

## 🎯 特徴

- **簡単操作**: スライダーとプレビューでリアルタイムに調整
- **完全ブラウザ完結**: 画像データはサーバーに送信されません
- **豊富なカスタマイズ**: 位置、サイズ、色、フォント、影など
- **Google Fonts対応**: 商用利用可能なフォントを簡単に選択
- **ローカルフォント対応**: PCにインストールされたフォントも使用可能
- **設定の自動保存**: 次回アクセス時に設定が復元されます

## 🚀 クイックスタート

1. [ツールにアクセス](#)（GitHub Pagesリンク）
2. 背景画像をアップロード（またはテンプレートを選択）
3. プレビューを見ながら設定を調整
4. 「コピー」ボタンでCSSをコピー
5. OBS Studioのブラウザソースにペースト

## 📋 必要なもの

- モダンブラウザ（Chrome, Firefox, Safari, Edge の最新版）
- 背景画像（推奨: 1088x639px, 500KB以下）

## 🎨 カスタマイズ項目

### 基本設定
- 背景画像の選択
- 数字の位置（X/Y座標）
- 数字のサイズ（50% ～ 500%）
- 数字の色
- 数字の回転（-45° ～ 45°）

### 詳細設定
- テキストシャドウ（影）
- フォント（Google Fonts / ローカルフォント）
- カンマ表示の切り替え
- 背景サイズの調整
- 桁幅・クリップ量の調整

## 🔒 プライバシー

- 選択された画像はブラウザ内でのみ処理されます
- 画像データはサーバーに送信されません
- 設定値のみブラウザのlocalStorageに保存されます
- 個人情報は一切収集しません

## 💻 ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/[username]/youtube-counter-css-generator.git

# ディレクトリに移動
cd youtube-counter-css-generator

# ローカルサーバーを起動（例: Live Server, http-server など）
# VS Codeの場合: index.html を右クリック → Open with Live Server
```

## 📁 ファイル構成

```
youtube-counter-css-generator/
├── index.html          # メインHTML
├── css/
│   └── style.css       # アプリのスタイル
├── js/
│   ├── app.js          # メインロジック
│   ├── preview.js      # プレビュー機能
│   ├── cssGenerator.js # CSS生成ロジック
│   └── storage.js      # localStorage管理
├── docs/
│   └── guide.html      # 使い方ガイド
└── README.md           # このファイル
```

## 🌐 対応ブラウザ

| ブラウザ | バージョン |
|---------|-----------|
| Chrome  | 最新版    |
| Firefox | 最新版    |
| Safari  | 最新版    |
| Edge    | 最新版    |

## 📄 ライセンス

MIT License

## 🤝 貢献

バグ報告や機能リクエストは [Issues](https://github.com/[username]/youtube-counter-css-generator/issues) からお願いします。

## 📮 サポート

- [使い方ガイド](docs/guide.html)
- [よくある質問](docs/guide.html#6-よくある質問)
- [Issues](https://github.com/[username]/youtube-counter-css-generator/issues)
