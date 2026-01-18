/**
 * Preview Manager - プレビュー表示を管理するモジュール
 */

const PreviewManager = (() => {
  // DOM要素のキャッシュ
  let previewBackground = null;
  let previewCounter = null;
  let googleFontPreview = null;
  let localFontPreview = null;

  // 現在のプレビュー状態
  let currentState = {
    backgroundImage: null,
    textColor: '#FFFFFF',
    positionX: -2,
    positionY: 41,
    scale: 270,
    rotation: -20,
    fontFamily: 'Moirai One',
    fontType: 'google',
    shadowEnabled: true,
    shadowBlur: 2,
    shadowColor: '#FFFFFF',
    showComma: false,
    backgroundWidth: 1088,
    backgroundHeight: 639,
  };

  // デバウンス用タイマー
  let updateTimer = null;
  const DEBOUNCE_DELAY = 50; // 50ms

  /**
   * 初期化
   */
  function init() {
    previewBackground = document.getElementById('previewBackground');
    previewCounter = document.getElementById('previewCounter');
    googleFontPreview = document.getElementById('googleFontPreview');
    localFontPreview = document.getElementById('localFontPreview');

    if (!previewBackground || !previewCounter) {
      console.error('プレビュー要素が見つかりません');
      return false;
    }

    return true;
  }

  /**
   * プレビューを更新する（デバウンス処理付き）
   * @param {Object} settings - 更新する設定
   */
  function update(settings) {
    // 状態を更新
    Object.assign(currentState, settings);

    // デバウンス処理
    if (updateTimer) {
      clearTimeout(updateTimer);
    }

    updateTimer = setTimeout(() => {
      applyPreview();
    }, DEBOUNCE_DELAY);
  }

  /**
   * プレビューを即座に更新する（デバウンスなし）
   * @param {Object} settings - 更新する設定
   */
  function updateImmediate(settings) {
    Object.assign(currentState, settings);
    applyPreview();
  }

  /**
   * プレビューにスタイルを適用する
   */
  function applyPreview() {
    if (!previewBackground || !previewCounter) return;

    const {
      backgroundImage,
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
    } = currentState;

    // 背景画像
    if (backgroundImage) {
      previewBackground.style.backgroundImage = `url(${backgroundImage})`;
    } else {
      previewBackground.style.backgroundImage = 'none';
      previewBackground.style.backgroundColor = '#333';
    }

    // プレビューのアスペクト比を維持
    const aspectRatio = backgroundHeight / backgroundWidth;
    const previewWidth = 400;
    const previewHeight = previewWidth * aspectRatio;
    previewBackground.style.width = `${previewWidth}px`;
    previewBackground.style.height = `${previewHeight}px`;

    // カウンターの位置（プレビュー用にスケール調整）
    previewCounter.style.left = `${50 + positionX / 2}%`;
    previewCounter.style.top = `${positionY}%`;
    previewCounter.style.transform = `translate(-50%, -50%) scale(${scale / 100}) rotate(${rotation}deg)`;

    // 色
    previewCounter.style.color = textColor;

    // 影
    if (shadowEnabled) {
      previewCounter.style.textShadow = `0 0 ${shadowBlur}px ${shadowColor}`;
    } else {
      previewCounter.style.textShadow = 'none';
    }

    // フォント
    const fontFamilyValue =
      fontType === 'google'
        ? `"${fontFamily}", system-ui`
        : `"${fontFamily}", sans-serif`;
    previewCounter.style.fontFamily = fontFamilyValue;

    // カンマ表示
    previewCounter.textContent = showComma ? '123,456' : '123456';
  }

  /**
   * 背景画像を設定する
   * @param {string} imageData - base64エンコードされた画像データ
   */
  function setBackgroundImage(imageData) {
    currentState.backgroundImage = imageData;
    applyPreview();
  }

  /**
   * 背景画像をクリアする
   */
  function clearBackgroundImage() {
    currentState.backgroundImage = null;
    applyPreview();
  }

  /**
   * Google Fontsプレビューを更新する
   * @param {string} fontFamily - フォント名
   */
  function updateGoogleFontPreview(fontFamily) {
    if (!googleFontPreview) return;

    // Google Fontsを動的に読み込む
    loadGoogleFont(fontFamily);

    googleFontPreview.style.fontFamily = `"${fontFamily}", system-ui`;
  }

  /**
   * ローカルフォントプレビューを更新する
   * @param {string} fontFamily - フォント名
   */
  function updateLocalFontPreview(fontFamily) {
    if (!localFontPreview) return;

    localFontPreview.style.fontFamily = `"${fontFamily}", sans-serif`;
  }

  /**
   * Google Fontsを動的に読み込む
   * @param {string} fontFamily - フォント名
   */
  function loadGoogleFont(fontFamily) {
    const fontId = `google-font-${fontFamily.replace(/\s+/g, '-')}`;

    // 既に読み込み済みの場合はスキップ
    if (document.getElementById(fontId)) return;

    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}&display=swap`;
    document.head.appendChild(link);
  }

  /**
   * フォントが利用可能かチェックする
   * @param {string} fontName - フォント名
   * @returns {boolean} フォントが利用可能かどうか
   */
  function isFontAvailable(fontName) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // モノスペースフォントを基準に比較
    context.font = '72px monospace';
    const baselineWidth = context.measureText('mmmmmmmmmmlli').width;

    context.font = `72px "${fontName}", monospace`;
    const testWidth = context.measureText('mmmmmmmmmmlli').width;

    return baselineWidth !== testWidth;
  }

  /**
   * テンプレート背景を設定する
   * @param {string} templateType - テンプレートの種類
   */
  function setTemplate(templateType) {
    let backgroundStyle = '';

    switch (templateType) {
      case 'simple':
        backgroundStyle = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        break;
      case 'gradient':
        backgroundStyle =
          'linear-gradient(45deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)';
        break;
      case 'frame':
        backgroundStyle = `
          linear-gradient(to right, #2c3e50 0%, #2c3e50 5%, transparent 5%, transparent 95%, #2c3e50 95%, #2c3e50 100%),
          linear-gradient(to bottom, #2c3e50 0%, #2c3e50 8%, transparent 8%, transparent 92%, #2c3e50 92%, #2c3e50 100%),
          linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)
        `;
        break;
      default:
        backgroundStyle = 'none';
    }

    if (previewBackground) {
      previewBackground.style.backgroundImage = backgroundStyle;
      currentState.backgroundImage = null;
    }

    return backgroundStyle;
  }

  /**
   * 現在の状態を取得する
   * @returns {Object} 現在の状態
   */
  function getState() {
    return { ...currentState };
  }

  // Public API
  return {
    init,
    update,
    updateImmediate,
    setBackgroundImage,
    clearBackgroundImage,
    updateGoogleFontPreview,
    updateLocalFontPreview,
    loadGoogleFont,
    isFontAvailable,
    setTemplate,
    getState,
  };
})();

// グローバルに公開
window.PreviewManager = PreviewManager;
