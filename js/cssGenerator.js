/**
 * CSS Generator - CSSコードを生成するモジュール
 */

const CSSGenerator = (() => {
  /**
   * CSSを生成する
   * @param {Object} settings - 設定オブジェクト
   * @param {string|null} backgroundImage - 背景画像のbase64データ
   * @returns {string} 生成されたCSS
   */
  function generate(settings, backgroundImage) {
    const {
      textColor,
      positionX,
      positionY,
      scale,
      rotation,
      fontFamily,
      fontType,
      shadowEnabled,
      shadowBlur,
      shadowColor,
      showComma,
      backgroundWidth,
      backgroundHeight,
      digitWidth,
      clipAmount,
      templateStyle,
    } = settings;

    // 背景画像のURL（base64またはテンプレート）
    let backgroundUrl = 'none';
    if (backgroundImage) {
      backgroundUrl = `url(${backgroundImage})`;
    } else if (templateStyle) {
      backgroundUrl = templateStyle;
    }

    // Google Fonts インポート文
    const fontImport =
      fontType === 'google'
        ? `@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}&display=swap');`
        : '/* ローカルフォント使用 - @importなし */';

    // フォントファミリー
    const fontFamilyValue =
      fontType === 'google'
        ? `"${fontFamily}", system-ui`
        : `"${fontFamily}", sans-serif`;

    // text-shadow
    const textShadow = shadowEnabled
      ? `0 0 ${shadowBlur}px ${shadowColor}`
      : 'none';

    // カンマ表示
    const commaDisplay = showComma ? 'inline' : 'none';

    // CSS生成
    const css = `${fontImport}

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
    --TextColor: ${textColor};
    --BackgroundWidhtSize: calc(${backgroundWidth}px);
    --BackgroundHeightSize: calc(${backgroundHeight}px);
    --main-top: 0px;
    --main-left: 0px;
    --counter-background: ${backgroundUrl};
    --counter-margin: 50px;
    --belt-top: ${positionY}%;
    --belt-left: ${positionX}%;
    --comma-margin-top: 0px;
    --comma-margin-left: 0px;
}

* {
    background-color: rgba(0, 0, 0, 0) !important;
    scrollbar-width: none !important;
    overflow: visible !important;
    color: var(--TextColor) !important;
    font-family: ${fontFamilyValue};
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
    transform: scale(${scale / 100}) rotate(${rotation}deg);
    text-shadow: ${textShadow};
}

.counter.yta-smooth-counter .counter-symbol.yta-smooth-counter .counter-value.yta-smooth-counter:not([is-digit]) {
    margin-top: var(--comma-margin-top) !important;
    margin-left: var(--comma-margin-left) !important;
}

.counter.yta-smooth-counter .counter-symbol.yta-smooth-counter .counter-value.yta-smooth-counter:not([is-digit]),
.counter.yta-smooth-counter .counter-symbol.yta-smooth-counter .counter-symbol-spacer.yta-smooth-counter:not([is-digit]) {
    display: ${commaDisplay} !important;
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
    --digit-width: ${digitWidth}px;
    --non-digit-width: 0;
}

.counter.yta-smooth-counter {
    overflow: hidden !important;
    clip-path: inset(${clipAmount}px 0 0 0);
}`;

    return css;
  }

  /**
   * テスト用のHTMLを生成する
   * @param {string} css - 生成されたCSS
   * @returns {string} HTMLコード
   */
  function generateHTML(css) {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Counter CSS Test</title>
    <style>
${css}
    </style>
</head>
<body>
    <div id="main-area">
        <div id="counter-area" class="small-counter-area style-scope yta-explore-subscribers">
            <div id="counter" class="small-counter style-scope yta-explore-subscribers">
                <div class="counter yta-smooth-counter">
                    <span class="counter-symbol yta-smooth-counter">
                        <span class="counter-value yta-smooth-counter" is-digit>1</span>
                    </span>
                    <span class="counter-symbol yta-smooth-counter">
                        <span class="counter-value yta-smooth-counter" is-digit>2</span>
                    </span>
                    <span class="counter-symbol yta-smooth-counter">
                        <span class="counter-value yta-smooth-counter" is-digit>3</span>
                    </span>
                    <span class="counter-symbol yta-smooth-counter">
                        <span class="counter-value yta-smooth-counter">
                            <span class="counter-symbol-spacer yta-smooth-counter">,</span>
                        </span>
                    </span>
                    <span class="counter-symbol yta-smooth-counter">
                        <span class="counter-value yta-smooth-counter" is-digit>4</span>
                    </span>
                    <span class="counter-symbol yta-smooth-counter">
                        <span class="counter-value yta-smooth-counter" is-digit>5</span>
                    </span>
                    <span class="counter-symbol yta-smooth-counter">
                        <span class="counter-value yta-smooth-counter" is-digit>6</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * 画像をbase64に変換する
   * @param {File} file - 画像ファイル
   * @returns {Promise<string>} base64エンコードされた画像
   */
  function imageToBase64(file) {
    return new Promise((resolve, reject) => {
      // ファイルタイプの確認
      const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        reject(new Error('サポートされていない画像形式です。'));
        return;
      }

      // ファイルサイズの確認（5MB制限）
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        reject(
          new Error('画像サイズが大きすぎます。5MB以下の画像を使用してください。')
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error('画像の読み込みに失敗しました。'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * 画像サイズを確認して警告を表示
   * @param {File} file - 画像ファイル
   * @returns {string|null} 警告メッセージ、または問題なければnull
   */
  function checkImageSize(file) {
    const warningSize = 500 * 1024; // 500KB
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      return 'エラー: 画像サイズが5MBを超えています。';
    }

    if (file.size > warningSize) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(2);
      return `注意: 画像サイズは${sizeMB}MBです。CSSが大きくなる可能性があります。推奨は500KB以下です。`;
    }

    return null;
  }

  // Public API
  return {
    generate,
    generateHTML,
    imageToBase64,
    checkImageSize,
  };
})();

// グローバルに公開
window.CSSGenerator = CSSGenerator;
