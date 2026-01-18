# YouTube登録者数カウンターCSS生成ツール - 仕様書

## 1. プロジェクト概要

### 1.1 目的
YouTube Analyticsの登録者数カウンターをカスタマイズするためのCSSを、ITに不慣れなユーザーでも簡単に生成できるWebアプリケーションを提供する。

### 1.2 ターゲットユーザー
- YouTube配信者
- OBS Studio等の配信ソフトを使用するユーザー
- CSS/HTMLの知識が少ない初心者

### 1.3 提供形態
- **GitHub Pagesでホスティング**
- **完全ブラウザ完結型**（サーバー通信なし）
- **静的Webアプリケーション**（HTML/CSS/JavaScript）

## 2. 技術仕様

### 2.1 技術スタック
- HTML5
- CSS3
- Vanilla JavaScript（フレームワーク不使用推奨）
- ブラウザAPIのみ使用（FileReader、localStorage等）

### 2.2 対応ブラウザ
- Chrome/Edge（最新版）
- Firefox（最新版）
- Safari（最新版）

### 2.3 セキュリティ・プライバシー要件
- **画像データは一切サーバーに送信しない**
- ブラウザ内でbase64エンコード処理
- localStorageは設定値の保存のみ（画像データは保存しない）
- プライバシーポリシーを明記

## 3. 機能仕様

### 3.1 必須機能

#### 3.1.1 画像アップロード機能
- ローカルファイルの選択（input type="file"）
- 対応形式: PNG, JPEG, GIF, WebP
- ブラウザ内でbase64エンコード
- プレビュー表示

#### 3.1.2 パラメータ設定機能（基本設定）

**背景画像**
- ファイル選択ボタン
- プレビュー表示

**数字の位置**
- X座標: スライダー + 数値入力（範囲: -100% ～ 100%）
- Y座標: スライダー + 数値入力（範囲: -100% ～ 100%）
- デフォルト値: X=-2%, Y=41%

**数字のサイズ**
- 拡大率: スライダー（範囲: 50% ～ 500%）
- デフォルト値: 270%

**数字の色**
- カラーピッカー
- デフォルト値: #FFFFFF（白）

**数字の回転**
- 角度: スライダー（範囲: -45度 ～ 45度）
- デフォルト値: -20度

#### 3.1.3 パラメータ設定機能（詳細設定 - 折りたたみ可能）

**テキスト装飾**
- 影の有無: チェックボックス
- 影のぼかし: スライダー（0px ～ 10px）
- デフォルト値: 影あり、ぼかし2px、色#FFFFFF

**フォント設定**
- プリセットから選択（ドロップダウン）
- 選択肢:
  - Moirai One（デフォルト、デザイン性重視）
  - Roboto（シンプル、読みやすい）
  - Orbitron（デジタル風）
  - Press Start 2P（レトロゲーム風）
  - Bebas Neue（スタイリッシュ）

**カンマ表示**
- 3桁区切りカンマ: チェックボックス
- デフォルト値: 非表示

**背景サイズ**
- 幅: 数値入力（デフォルト: 1088px）
- 高さ: 数値入力（デフォルト: 639px）

**数字の桁幅**
- 各桁の幅: 数値入力（デフォルト: 46px）

**数字のクリッピング**
- 上部クリップ量: 数値入力（デフォルト: 20px）

#### 3.1.4 リアルタイムプレビュー機能
- パラメータ変更時に即座にプレビュー更新
- プレビューエリアに背景画像とサンプル数字を表示
- サンプル数字: "123,456"（固定）

#### 3.1.5 CSS生成機能
- 「CSS生成」ボタン
- テキストエリアに完成したCSSコードを出力
- 「コピー」ボタンでクリップボードにコピー
- コピー成功時の視覚的フィードバック

### 3.2 補助機能

#### 3.2.1 設定の保存・読み込み
- localStorageに設定値を保存（画像データは除く）
- ページ再読み込み時に前回の設定を復元
- 「設定をリセット」ボタンでデフォルト値に戻す

#### 3.2.2 テンプレート機能（オプション）
- プリセット背景パターンの提供
  - シンプル（単色背景）
  - グラデーション
  - フレーム風
- テンプレート選択で画像不要で試用可能

#### 3.2.3 エクスポート機能
- CSS単体の出力
- オプション: HTML + CSSのセット出力（テスト用）

## 4. UIデザイン仕様

### 4.1 レイアウト構成

```
┌─────────────────────────────────────────┐
│ ヘッダー                                 │
│ - タイトル                               │
│ - プライバシー通知                       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ メインエリア                             │
│ ┌─────────────┐ ┌───────────────────┐ │
│ │             │ │                   │ │
│ │ プレビュー  │ │ 設定パネル        │ │
│ │ エリア      │ │ - 基本設定        │ │
│ │             │ │ - 詳細設定        │ │
│ │             │ │   （折りたたみ）  │ │
│ └─────────────┘ └───────────────────┘ │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 出力エリア                               │
│ - CSS出力テキストエリア                  │
│ - コピーボタン                           │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ フッター                                 │
│ - 使い方ガイドへのリンク                 │
│ - GitHubリポジトリリンク                 │
└─────────────────────────────────────────┘
```

### 4.2 UIコンポーネント詳細

#### 4.2.1 ヘッダー
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YouTube登録者数カウンターCSS生成ツール

🔒 選択した画像はブラウザ内でのみ処理され、
   サーバーには一切送信されません。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 4.2.2 基本設定パネル
```
【基本設定】
┌─────────────────────────┐
│ 背景画像を選択           │
└─────────────────────────┘
[ファイルを選択] または [テンプレートから選択]

数字の位置
  X座標: [▬▬●▬▬▬] -2%  [数値入力]
  Y座標: [▬▬▬●▬▬] 41%  [数値入力]

数字のサイズ
  拡大率: [▬▬▬▬●▬] 270% [数値入力]

数字の色
  [●] #FFFFFF [カラーピッカー]

数字の回転
  角度: [●▬▬▬▬▬] -20° [数値入力]
```

#### 4.2.3 詳細設定パネル（折りたたみ）
```
▼ 詳細設定

テキスト装飾
  影を付ける: [☑]
  影のぼかし: [▬▬●▬▬] 2px

フォント
  [Moirai One ▼]

表示オプション
  カンマを表示: [☐]

背景サイズ
  幅: [1088] px
  高さ: [639] px

数字の調整（上級者向け）
  桁幅: [46] px
  上部クリップ: [20] px
```

#### 4.2.4 出力エリア
```
【生成されたCSS】
┌─────────────────────────────────┐
│ @import url('...');              │
│ :root {                          │
│   --counter-background: url(...);│
│   ...                            │
│ }                                │
└─────────────────────────────────┘
[📋 コピー] [⚙️ 設定をリセット]
```

### 4.3 レスポンシブデザイン
- デスクトップ: 2カラムレイアウト（プレビュー + 設定）
- タブレット/スマホ: 1カラム（縦積み）
- 最小推奨画面幅: 320px

### 4.4 色・フォント
- メインカラー: #1976D2（YouTube風ブルー系）
- アクセントカラー: #FF0000（YouTube赤）
- 背景色: #F5F5F5（薄いグレー）
- テキスト: #212121（濃いグレー）
- フォント: システムフォント（sans-serif）

## 5. 出力CSS仕様

### 5.1 生成されるCSSの構造

```css
@import url('https://fonts.googleapis.com/css2?family={選択されたフォント}&display=swap');

html,
body,
#html-body {
    margin: 0;
    padding: 0;
    background-color: rgba(100, 0, 0, 50) !important;
    background: none !important;
}

:root {
    font-size: 72px;
    --TextColor: {ユーザー設定の色};
    --BackgroundWidhtSize: calc({ユーザー設定の幅}px);
    --BackgroundHeightSize: calc({ユーザー設定の高さ}px);
    --main-top: 0px;
    --main-left: 0px;
    --counter-background: url({base64エンコードされた画像});
    --counter-margin: 50px;
    --belt-top: {ユーザー設定のY座標}%;
    --belt-left: {ユーザー設定のX座標}%;
    --comma-margin-top: 0px;
    --comma-margin-left: 0px;
}

* {
    background-color: rgba(0, 0, 0, 0) !important;
    scrollbar-width: none !important;
    overflow: visible !important;
    color: var(--TextColor) !important;
    font-family: "{選択されたフォント}", system-ui;
    font-weight: 400;
    font-style: normal;
}

#main-area {
    top: var(--main-top) !important;
    left: var(--main-left) !important;
    width: var(--BackgroundWidhtSize) !important;
}

#counter-area.small-counter-area.style-scope.yta-explore-subscribers {
    background-image: var(--counter-background) !important;
    margin: var(--counter-margin) !important;
    width: var(--BackgroundWidhtSize) !important;
    height: var(--BackgroundHeightSize) !important;
    background-repeat: no-repeat;
    overflow: visible !important;
    background-size: cover;
    min-height: initial !important;
}

#counter.small-counter.style-scope.yta-explore-subscribers {
    top: var(--belt-top) !important;
    left: var(--belt-left) !important;
    overflow: hidden !important;
    transform: scale({ユーザー設定の拡大率}%) rotate({ユーザー設定の回転角度}deg);
    text-shadow: 0 0 {ユーザー設定のぼかし}px {ユーザー設定の影の色};
}

.counter.yta-smooth-counter .counter-symbol.yta-smooth-counter .counter-value.yta-smooth-counter:not([is-digit]) {
    margin-top: var(--comma-margin-top) !important;
    margin-left: var(--comma-margin-left) !important;
}

.counter.yta-smooth-counter .counter-symbol.yta-smooth-counter .counter-value.yta-smooth-counter:not([is-digit]),
.counter.yta-smooth-counter .counter-symbol.yta-smooth-counter .counter-symbol-spacer.yta-smooth-counter:not([is-digit]) {
    display: {カンマ表示ON: inline, OFF: none} !important;
}

#subscribers-label.style-scope.yta-explore-subscribers {
    background-color: #f00 !important;
    color: rgba(0, 0, 0, 0) !important;
    display: none;
}

#main,
#left-nav,
header,
.tab-content.layout.vertical.style-scope.yta-screen,
#header-rectangle.style-scope.yta-explore-subscribers,
#chart-area.style-scope.yta-explore-subscribers,
#icon-buttons-right,
body > *:not(yta-explore-dialog) {
    display: none !important;
}

#counter.small-counter.style-scope.yta-explore-subscribers {
    --digit-width: {ユーザー設定の桁幅}px;
    --non-digit-width: 0;
}

.counter.yta-smooth-counter {
    overflow: hidden !important;
    clip-path: inset({ユーザー設定のクリップ量}px 0 0 0);
}
```

### 5.2 変数マッピング

| UIパラメータ | CSS変数/プロパティ | デフォルト値 |
|------------|-------------------|------------|
| 背景画像 | --counter-background | （なし） |
| テキスト色 | --TextColor | #FFFFFF |
| X座標 | --belt-left | -2% |
| Y座標 | --belt-top | 41% |
| 拡大率 | transform: scale() | 270% |
| 回転角度 | transform: rotate() | -20deg |
| 影のぼかし | text-shadow blur | 2px |
| 影の色 | text-shadow color | #FFFFFF |
| フォント | font-family | Moirai One |
| カンマ表示 | display | none |
| 背景幅 | --BackgroundWidhtSize | 1088px |
| 背景高さ | --BackgroundHeightSize | 639px |
| 桁幅 | --digit-width | 46px |
| 上部クリップ | clip-path inset | 20px |

## 6. ファイル構成

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
├── assets/
│   └── templates/      # プリセット背景画像（オプション）
│       ├── simple.png
│       ├── gradient.png
│       └── frame.png
├── docs/
│   └── guide.md        # 使い方ガイド
├── README.md           # プロジェクト説明
└── LICENSE             # ライセンス（MIT推奨）
```

## 7. 機能フロー

### 7.1 基本フロー
```
1. ユーザーがページにアクセス
   ↓
2. 画像を選択（またはテンプレート選択）
   ↓
3. FileReaderでbase64エンコード
   ↓
4. プレビューエリアに表示
   ↓
5. パラメータをスライダー等で調整
   ↓
6. リアルタイムでプレビュー更新
   ↓
7. 「CSS生成」ボタンをクリック
   ↓
8. テキストエリアにCSSコードを出力
   ↓
9. 「コピー」ボタンでクリップボードにコピー
   ↓
10. 完了（配信ソフトに貼り付けて使用）
```

### 7.2 画像処理フロー
```javascript
// 疑似コード
function handleImageUpload(file) {
  // 1. ファイルサイズチェック（推奨: 5MB以下）
  if (file.size > 5 * 1024 * 1024) {
    alert('ファイルサイズが大きすぎます');
    return;
  }
  
  // 2. FileReaderでbase64エンコード
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Data = e.target.result;
    
    // 3. プレビュー更新
    updatePreview(base64Data);
    
    // 4. CSS生成用データとして保持（サーバー送信なし）
    currentSettings.backgroundImage = base64Data;
  };
  reader.readAsDataURL(file);
}
```

### 7.3 CSS生成フロー
```javascript
// 疑似コード
function generateCSS(settings) {
  // 1. テンプレートCSSを読み込み
  let cssTemplate = getCSSTemplate();
  
  // 2. 変数を置換
  cssTemplate = cssTemplate
    .replace('{フォント}', settings.fontFamily)
    .replace('{テキスト色}', settings.textColor)
    .replace('{背景画像}', settings.backgroundImage)
    .replace('{X座標}', settings.positionX)
    .replace('{Y座標}', settings.positionY)
    .replace('{拡大率}', settings.scale)
    .replace('{回転角度}', settings.rotation)
    // ... その他の変数
  
  // 3. 出力
  return cssTemplate;
}
```

## 8. エラーハンドリング

### 8.1 想定されるエラー
1. **画像読み込みエラー**
   - 対応: エラーメッセージ表示 + デフォルト画像提案

2. **ファイルサイズ超過**
   - 対応: 警告メッセージ + 推奨サイズの案内

3. **非対応ファイル形式**
   - 対応: エラーメッセージ + 対応形式の表示

4. **localStorage容量超過**
   - 対応: 警告メッセージ + 設定リセット提案

5. **クリップボードコピー失敗**
   - 対応: 手動選択のガイダンス表示

### 8.2 バリデーション

- 数値入力: 範囲外の値は自動補正
- 色指定: 不正な値はデフォルト色に戻す
- 画像ファイル: MIME typeチェック

## 9. パフォーマンス要件

- 画像プレビュー更新: 500ms以内
- パラメータ変更時のプレビュー更新: 100ms以内（デバウンス処理）
- CSS生成: 1秒以内
- 初回ロード時間: 3秒以内

## 10. アクセシビリティ

- キーボード操作対応
- スクリーンリーダー対応（適切なaria-label）
- コントラスト比: WCAG AA準拠
- フォーカスインジケーター明示

## 11. ブラウザストレージ仕様

### 11.1 localStorage使用データ

```javascript
{
  "settings": {
    "textColor": "#FFFFFF",
    "positionX": -2,
    "positionY": 41,
    "scale": 270,
    "rotation": -20,
    "fontFamily": "Moirai One",
    "shadowBlur": 2,
    "shadowColor": "#FFFFFF",
    "showComma": false,
    "backgroundWidth": 1088,
    "backgroundHeight": 639,
    "digitWidth": 46,
    "clipAmount": 20
  },
  // 注意: 画像データは保存しない
  "lastUpdated": "2026-01-18T12:00:00Z"
}
```

### 11.2 データサイズ制限
- 設定データのみ保存（数KB程度）
- 画像データは保存しない（容量超過防止）

## 12. 使用するGoogle Fonts

すべて**商用利用可能**（SIL Open Font License等）

1. **Moirai One**
   - ライセンス: SIL Open Font License
   - URL: https://fonts.google.com/specimen/Moirai+One

2. **Roboto**
   - ライセンス: Apache License 2.0
   - URL: https://fonts.google.com/specimen/Roboto

3. **Orbitron**
   - ライセンス: SIL Open Font License
   - URL: https://fonts.google.com/specimen/Orbitron

4. **Press Start 2P**
   - ライセンス: SIL Open Font License
   - URL: https://fonts.google.com/specimen/Press+Start+2P

5. **Bebas Neue**
   - ライセンス: SIL Open Font License
   - URL: https://fonts.google.com/specimen/Bebas+Neue

## 13. テスト項目

### 13.1 機能テスト
- [ ] 画像アップロード動作
- [ ] 各パラメータの調整とプレビュー反映
- [ ] CSS生成の正確性
- [ ] クリップボードコピー機能
- [ ] 設定の保存・復元
- [ ] 設定リセット機能

### 13.2 ブラウザ互換性テスト
- [ ] Chrome（最新版）
- [ ] Firefox（最新版）
- [ ] Safari（最新版）
- [ ] Edge（最新版）

### 13.3 レスポンシブテスト
- [ ] デスクトップ（1920x1080）
- [ ] ラップトップ（1366x768）
- [ ] タブレット（768x1024）
- [ ] スマートフォン（375x667）

### 13.4 パフォーマンステスト
- [ ] 大きな画像（5MB）の処理時間
- [ ] パラメータ変更時の反応速度
- [ ] メモリリーク確認

## 14. ドキュメント要件

### 14.1 README.md
- プロジェクト概要
- 使い方（クイックスタート）
- ローカル開発方法
- ライセンス情報

### 14.2 使い方ガイド（docs/guide.md）
- 画像の準備方法
- パラメータの説明
- OBS Studioでの使用方法
- トラブルシューティング

### 14.3 コード内コメント
- 各関数の説明
- 複雑なロジックの解説
- TODO/FIXMEの記載

## 15. 将来の拡張案（オプション）

### Phase 2以降の機能
- 複数プリセットの保存・管理
- エクスポート/インポート機能（JSON形式）
- アニメーション効果の追加
- 多言語対応（英語、日本語）
- ダークモード対応
- 背景画像の簡易編集機能（トリミング、回転等）

## 16. ライセンス

### 推奨ライセンス
**MIT License**

理由:
- オープンソース
- 商用利用可能
- 改変・再配布自由
- シンプルで理解しやすい

## 17. プライバシーポリシー

### 表示内容
```
【プライバシーポリシー】

このツールについて:
- 選択された画像はブラウザ内でのみ処理されます
- 画像データはサーバーに送信されません
- 設定値のみブラウザのlocalStorageに保存されます
- 個人情報は一切収集しません
- Cookieは使用しません
- アクセス解析ツールは使用しません（オプション）

オープンソース:
このプロジェクトはMITライセンスの下で公開されています。
ソースコード: [GitHubリポジトリURL]
```

## 18. デプロイ手順

### GitHub Pagesへのデプロイ
1. GitHubリポジトリ作成
2. コードをpush
3. Settings > Pages で公開設定
4. ブランチ選択（main/gh-pages）
5. カスタムドメイン設定（オプション）

### URL例
```
https://[ユーザー名].github.io/youtube-counter-css-generator/
```

## 19. 開発優先順位

### Phase 1（MVP - Minimum Viable Product）
1. 基本UI構築
2. 画像アップロード機能
3. 基本パラメータ調整（位置、サイズ、色、回転）
4. プレビュー機能
5. CSS生成・コピー機能

### Phase 2（機能拡充）
1. 詳細設定追加
2. テンプレート機能
3. 設定の保存・復元
4. エラーハンドリング強化

### Phase 3（品質向上）
1. レスポンシブ対応
2. アクセシビリティ対応
3. パフォーマンス最適化
4. ドキュメント整備

## 20. 補足事項

### 20.1 技術的制約
- base64エンコード後のCSS全体が大きくなりすぎる場合の対処
  - 推奨: 背景画像は500KB以下を推奨
  - 警告表示: 5MB超過時は警告

### 20.2 ユーザーサポート
- GitHub Issues でのサポート
- FAQページの用意
- サンプル画像の提供

### 20.3 更新・メンテナンス
- 依存ライブラリなし（保守負担軽減）
- ブラウザAPI変更への対応
- ユーザーフィードバックの反映

---

**仕様書バージョン**: 1.0  
**作成日**: 2026-01-18  
**最終更新日**: 2026-01-18
