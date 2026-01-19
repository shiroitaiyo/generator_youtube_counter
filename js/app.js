/**
 * Main Application - アプリケーションのメインロジック
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================================
  // DOM要素の取得
  // ========================================================================

  // 基本設定
  const imageInput = document.getElementById('imageInput');
  const fileName = document.getElementById('fileName');
  const templateSelect = document.getElementById('templateSelect');
  const previewNumber = document.getElementById('previewNumber');
  const positionX = document.getElementById('positionX');
  const positionXNum = document.getElementById('positionXNum');
  const positionY = document.getElementById('positionY');
  const positionYNum = document.getElementById('positionYNum');
  const scale = document.getElementById('scale');
  const scaleNum = document.getElementById('scaleNum');
  const textColor = document.getElementById('textColor');
  const textColorHex = document.getElementById('textColorHex');
  const rotation = document.getElementById('rotation');
  const rotationNum = document.getElementById('rotationNum');

  // 詳細設定
  const shadowEnabled = document.getElementById('shadowEnabled');
  const shadowBlur = document.getElementById('shadowBlur');
  const shadowBlurNum = document.getElementById('shadowBlurNum');
  const shadowColor = document.getElementById('shadowColor');
  const shadowColorHex = document.getElementById('shadowColorHex');
  const shadowControls = document.getElementById('shadowControls');
  const shadowColorControl = document.getElementById('shadowColorControl');

  // フォント設定
  const fontTabs = document.querySelectorAll('.font-tab');
  const googleFontsPanel = document.getElementById('googleFontsPanel');
  const localFontsPanel = document.getElementById('localFontsPanel');
  const googleFontSelect = document.getElementById('googleFontSelect');
  const localFontInput = document.getElementById('localFontInput');
  const localFontSelect = document.getElementById('localFontSelect');
  const loadFontsBtn = document.getElementById('loadFontsBtn');
  const fontStatus = document.getElementById('fontStatus');
  const fontApiSupported = document.getElementById('fontApiSupported');

  // その他の設定
  const showComma = document.getElementById('showComma');
  const bgWidth = document.getElementById('bgWidth');
  const bgHeight = document.getElementById('bgHeight');
  const bgWidthDisplay = document.getElementById('bgWidthDisplay');
  const bgHeightDisplay = document.getElementById('bgHeightDisplay');
  const sizeInfo = document.getElementById('sizeInfo');
  const sizeValues = document.getElementById('sizeValues');
  const obsHint = document.getElementById('obsHint');
  const digitWidth = document.getElementById('digitWidth');
  const clipAmount = document.getElementById('clipAmount');

  // 出力エリア
  const cssOutput = document.getElementById('cssOutput');
  const regenerateBtn = document.getElementById('regenerateBtn');
  const copyBtn = document.getElementById('copyBtn');
  const resetBtn = document.getElementById('resetBtn');
  const exportHtmlBtn = document.getElementById('exportHtmlBtn');
  const copyFeedback = document.getElementById('copyFeedback');

  // モーダル
  const privacyLink = document.getElementById('privacyLink');
  const privacyModal = document.getElementById('privacyModal');
  const closeModal = document.getElementById('closeModal');
  const modalOverlay = privacyModal.querySelector('.modal__overlay');

  // ========================================================================
  // 状態管理
  // ========================================================================

  let currentBackgroundImage = null;
  let currentTemplateStyle = null;
  let currentFontType = 'google';

  // ========================================================================
  // 初期化
  // ========================================================================

  function init() {
    // PreviewManagerの初期化
    if (!PreviewManager.init()) {
      console.error('PreviewManager の初期化に失敗しました');
      return;
    }

    // 保存された設定を読み込む
    loadSettings();

    // Local Font Access APIのサポートチェック
    checkLocalFontApiSupport();

    // イベントリスナーの設定
    setupEventListeners();

    // 初回CSS生成
    generateCSS();

    // デフォルトフォントの読み込み
    const settings = StorageManager.load();
    PreviewManager.loadGoogleFont(settings.fontFamily);
  }

  // ========================================================================
  // 設定の読み込み・保存
  // ========================================================================

  function loadSettings() {
    const settings = StorageManager.load();

    // 基本設定
    positionX.value = settings.positionX;
    positionXNum.value = settings.positionX;
    positionY.value = settings.positionY;
    positionYNum.value = settings.positionY;
    scale.value = settings.scale;
    scaleNum.value = settings.scale;
    textColor.value = settings.textColor;
    textColorHex.value = settings.textColor;
    rotation.value = settings.rotation;
    rotationNum.value = settings.rotation;

    // 詳細設定
    shadowEnabled.checked = settings.shadowEnabled;
    shadowBlur.value = settings.shadowBlur;
    shadowBlurNum.value = settings.shadowBlur;
    shadowColor.value = settings.shadowColor;
    shadowColorHex.value = settings.shadowColor;
    showComma.checked = settings.showComma;
    bgWidth.value = settings.backgroundWidth;
    bgHeight.value = settings.backgroundHeight;
    digitWidth.value = settings.digitWidth;
    clipAmount.value = settings.clipAmount;

    // フォント設定
    currentFontType = settings.fontType;
    if (settings.fontType === 'google') {
      googleFontSelect.value = settings.fontFamily;
      activateFontTab('google');
    } else {
      localFontInput.value = settings.fontFamily;
      activateFontTab('local');
    }

    // テンプレート
    if (settings.template) {
      templateSelect.value = settings.template;
      currentTemplateStyle = PreviewManager.setTemplate(settings.template);
      // テンプレート使用時はサイズ表示
      updateSizeDisplay(settings.backgroundWidth, settings.backgroundHeight);
    } else {
      currentTemplateStyle = null;
    }

    // 影コントロールの表示状態
    updateShadowControlsVisibility();

    // プレビューを更新
    updatePreview();
  }

  function saveSettings() {
    const settings = {
      textColor: textColor.value,
      positionX: parseInt(positionX.value, 10),
      positionY: parseInt(positionY.value, 10),
      scale: parseInt(scale.value, 10),
      rotation: parseInt(rotation.value, 10),
      fontType: currentFontType,
      fontFamily:
        currentFontType === 'google'
          ? googleFontSelect.value
          : localFontInput.value,
      shadowEnabled: shadowEnabled.checked,
      shadowBlur: parseInt(shadowBlur.value, 10),
      shadowColor: shadowColor.value,
      showComma: showComma.checked,
      backgroundWidth: parseInt(bgWidth.value, 10),
      backgroundHeight: parseInt(bgHeight.value, 10),
      digitWidth: parseInt(digitWidth.value, 10),
      clipAmount: parseInt(clipAmount.value, 10),
      template: templateSelect.value,
    };

    StorageManager.save(settings);
  }

  // ========================================================================
  // イベントリスナーの設定
  // ========================================================================

  function setupEventListeners() {
    // 画像アップロード
    imageInput.addEventListener('change', handleImageUpload);

    // テンプレート選択
    templateSelect.addEventListener('change', handleTemplateChange);

    // プレビュー数値
    previewNumber.addEventListener('input', handlePreviewNumberChange);

    // スライダーと数値入力の同期
    setupSliderSync(positionX, positionXNum);
    setupSliderSync(positionY, positionYNum);
    setupSliderSync(scale, scaleNum);
    setupSliderSync(rotation, rotationNum);
    setupSliderSync(shadowBlur, shadowBlurNum);

    // カラーピッカーと16進数入力の同期
    setupColorSync(textColor, textColorHex);
    setupColorSync(shadowColor, shadowColorHex);

    // 影の有効/無効
    shadowEnabled.addEventListener('change', () => {
      updateShadowControlsVisibility();
      updatePreview();
      generateCSS();
      saveSettings();
    });

    // フォントタブ
    fontTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activateFontTab(tab.dataset.tab);
        updatePreview();
        generateCSS();
        saveSettings();
      });
    });

    // Google Fonts選択
    googleFontSelect.addEventListener('change', () => {
      PreviewManager.loadGoogleFont(googleFontSelect.value);
      PreviewManager.updateGoogleFontPreview(googleFontSelect.value);
      updatePreview();
      generateCSS();
      saveSettings();
    });

    // ローカルフォント入力
    localFontInput.addEventListener('input', debounce(handleLocalFontInput, 300));

    // ローカルフォント一覧から選択
    localFontSelect.addEventListener('change', () => {
      localFontInput.value = localFontSelect.value;
      handleLocalFontInput();
    });

    // フォント一覧読み込みボタン
    loadFontsBtn.addEventListener('click', loadLocalFonts);

    // その他の設定
    showComma.addEventListener('change', () => {
      updatePreviewNumber();
      updatePreview();
      generateCSS();
      saveSettings();
    });

    bgWidth.addEventListener('input', debounce(handleSizeChange, 200));
    bgHeight.addEventListener('input', debounce(handleSizeChange, 200));
    digitWidth.addEventListener('input', debounce(handleAdvancedChange, 200));
    clipAmount.addEventListener('input', debounce(handleAdvancedChange, 200));

    // 出力ボタン
    regenerateBtn.addEventListener('click', () => {
      generateCSS();
      showRegenerateFeedback();
    });
    copyBtn.addEventListener('click', copyCSS);
    resetBtn.addEventListener('click', resetSettings);
    exportHtmlBtn.addEventListener('click', exportHTML);

    // モーダル
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
    closeModal.addEventListener('click', closeModalHandler);
    modalOverlay.addEventListener('click', closeModalHandler);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && privacyModal.classList.contains('modal--visible')) {
        closeModalHandler();
      }
    });
  }

  // ========================================================================
  // スライダー・入力同期のヘルパー
  // ========================================================================

  function setupSliderSync(slider, numInput) {
    slider.addEventListener('input', () => {
      numInput.value = slider.value;
      updatePreview();
      generateCSS();
    });

    slider.addEventListener('change', saveSettings);

    numInput.addEventListener('input', () => {
      const min = parseInt(slider.min, 10);
      const max = parseInt(slider.max, 10);
      let value = parseInt(numInput.value, 10);

      if (!isNaN(value)) {
        value = Math.max(min, Math.min(max, value));
        slider.value = value;
        numInput.value = value;
        updatePreview();
        generateCSS();
      }
    });

    numInput.addEventListener('change', saveSettings);
  }

  function setupColorSync(picker, hexInput) {
    picker.addEventListener('input', () => {
      hexInput.value = picker.value.toUpperCase();
      updatePreview();
      generateCSS();
    });

    picker.addEventListener('change', saveSettings);

    hexInput.addEventListener('input', () => {
      const hex = hexInput.value.trim();
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        picker.value = hex;
        updatePreview();
        generateCSS();
      }
    });

    hexInput.addEventListener('change', saveSettings);
  }

  // ========================================================================
  // プレビュー数値処理
  // ========================================================================

  function handlePreviewNumberChange() {
    let value = parseInt(previewNumber.value, 10);

    // 範囲制限
    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > 9999999) {
      value = 9999999;
    }

    previewNumber.value = value;
    updatePreviewNumber();
  }

  function updatePreviewNumber() {
    const value = parseInt(previewNumber.value, 10) || 0;
    PreviewManager.setPreviewNumber(value, showComma.checked);
  }

  // ========================================================================
  // 画像アップロード処理
  // ========================================================================

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // サイズチェック
    const warning = CSSGenerator.checkImageSize(file);
    if (warning) {
      if (warning.startsWith('エラー')) {
        alert(warning);
        imageInput.value = '';
        return;
      }
      console.warn(warning);
    }

    try {
      const base64 = await CSSGenerator.imageToBase64(file);

      // 画像のサイズを取得
      const dimensions = await getImageDimensions(base64);

      // サイズを設定
      bgWidth.value = dimensions.width;
      bgHeight.value = dimensions.height;
      updateSizeDisplay(dimensions.width, dimensions.height);

      currentBackgroundImage = base64;
      currentTemplateStyle = null;
      templateSelect.value = '';
      fileName.textContent = file.name;

      PreviewManager.setBackgroundImage(base64);
      updatePreview();
      generateCSS();
      saveSettings();
    } catch (error) {
      alert(error.message);
      imageInput.value = '';
    }
  }

  /**
   * 画像のサイズを取得する
   * @param {string} base64 - base64エンコードされた画像
   * @returns {Promise<{width: number, height: number}>}
   */
  function getImageDimensions(base64) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.onerror = () => {
        reject(new Error('画像の読み込みに失敗しました。'));
      };
      img.src = base64;
    });
  }

  /**
   * サイズ表示を更新する
   * @param {number} width
   * @param {number} height
   */
  function updateSizeDisplay(width, height) {
    bgWidthDisplay.textContent = width;
    bgHeightDisplay.textContent = height;
    sizeInfo.style.display = 'none';
    sizeValues.style.display = 'flex';
    obsHint.style.display = 'flex';
  }

  /**
   * サイズ表示をリセットする
   */
  function resetSizeDisplay() {
    sizeInfo.style.display = 'block';
    sizeValues.style.display = 'none';
    obsHint.style.display = 'none';
  }

  // ========================================================================
  // テンプレート処理
  // ========================================================================

  function handleTemplateChange() {
    const template = templateSelect.value;

    if (template) {
      // テンプレートを設定（PreviewManagerが背景を設定し、CSSスタイルを返す）
      currentTemplateStyle = PreviewManager.setTemplate(template);
      currentBackgroundImage = null;
      imageInput.value = '';
      fileName.textContent = '選択されていません';

      // テンプレート使用時はデフォルトサイズを設定
      const defaultWidth = 1000;
      const defaultHeight = 600;
      bgWidth.value = defaultWidth;
      bgHeight.value = defaultHeight;
      updateSizeDisplay(defaultWidth, defaultHeight);
    } else {
      currentTemplateStyle = null;
      PreviewManager.clearBackgroundImage();
      resetSizeDisplay();
    }

    // プレビューの他の要素（色、位置など）を更新
    updatePreviewWithoutBackground();
    generateCSS();
    saveSettings();
  }

  /**
   * 背景以外のプレビュー要素を更新する
   */
  function updatePreviewWithoutBackground() {
    const fontFamily =
      currentFontType === 'google'
        ? googleFontSelect.value
        : localFontInput.value || 'sans-serif';

    // PreviewManagerの状態を更新（背景は変更しない）
    PreviewManager.update({
      textColor: textColor.value,
      positionX: parseInt(positionX.value, 10),
      positionY: parseInt(positionY.value, 10),
      scale: parseInt(scale.value, 10),
      rotation: parseInt(rotation.value, 10),
      fontFamily: fontFamily,
      fontType: currentFontType,
      shadowEnabled: shadowEnabled.checked,
      shadowBlur: parseInt(shadowBlur.value, 10),
      shadowColor: shadowColor.value,
      showComma: showComma.checked,
      backgroundWidth: parseInt(bgWidth.value, 10),
      backgroundHeight: parseInt(bgHeight.value, 10),
    });
  }

  // ========================================================================
  // フォント処理
  // ========================================================================

  function activateFontTab(tabType) {
    currentFontType = tabType;

    fontTabs.forEach((tab) => {
      if (tab.dataset.tab === tabType) {
        tab.classList.add('font-tab--active');
      } else {
        tab.classList.remove('font-tab--active');
      }
    });

    if (tabType === 'google') {
      googleFontsPanel.classList.add('font-panel--active');
      localFontsPanel.classList.remove('font-panel--active');
      PreviewManager.updateGoogleFontPreview(googleFontSelect.value);
    } else {
      googleFontsPanel.classList.remove('font-panel--active');
      localFontsPanel.classList.add('font-panel--active');
      PreviewManager.updateLocalFontPreview(localFontInput.value);
    }
  }

  function handleLocalFontInput() {
    const fontName = localFontInput.value.trim();

    if (fontName) {
      const isAvailable = PreviewManager.isFontAvailable(fontName);

      if (isAvailable) {
        fontStatus.textContent = '✓ フォントが見つかりました';
        fontStatus.className = 'font-status font-status--available';
      } else {
        fontStatus.textContent =
          '⚠ フォントが見つかりません（入力が正しいか確認してください）';
        fontStatus.className = 'font-status font-status--unavailable';
      }

      PreviewManager.updateLocalFontPreview(fontName);
      updatePreview();
      generateCSS();
      saveSettings();
    } else {
      fontStatus.textContent = '';
      fontStatus.className = 'font-status';
    }
  }

  function checkLocalFontApiSupport() {
    if ('queryLocalFonts' in window) {
      fontApiSupported.style.display = 'block';
    }
  }

  async function loadLocalFonts() {
    if (!('queryLocalFonts' in window)) {
      alert('お使いのブラウザはLocal Font Access APIに対応していません。');
      return;
    }

    try {
      const fonts = await window.queryLocalFonts();
      const uniqueFamilies = [...new Set(fonts.map((f) => f.family))].sort();

      localFontSelect.innerHTML = '<option value="">-- フォントを選択 --</option>';
      uniqueFamilies.forEach((family) => {
        const option = document.createElement('option');
        option.value = family;
        option.textContent = family;
        localFontSelect.appendChild(option);
      });

      localFontSelect.style.display = 'block';
      loadFontsBtn.textContent = 'フォント一覧を更新';
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        alert('フォント一覧へのアクセスが許可されませんでした。');
      } else {
        console.error('フォント一覧の取得に失敗しました:', error);
        alert('フォント一覧の取得に失敗しました。');
      }
    }
  }

  // ========================================================================
  // 影コントロール
  // ========================================================================

  function updateShadowControlsVisibility() {
    const isEnabled = shadowEnabled.checked;
    shadowControls.classList.toggle('shadow-control--hidden', !isEnabled);
    shadowColorControl.classList.toggle('shadow-control--hidden', !isEnabled);
  }

  // ========================================================================
  // その他の設定変更
  // ========================================================================

  function handleSizeChange() {
    updatePreview();
    generateCSS();
    saveSettings();
  }

  function handleAdvancedChange() {
    generateCSS();
    saveSettings();
  }

  // ========================================================================
  // プレビュー更新
  // ========================================================================

  function updatePreview() {
    const fontFamily =
      currentFontType === 'google'
        ? googleFontSelect.value
        : localFontInput.value || 'sans-serif';

    const previewValue = parseInt(previewNumber.value, 10) || 0;

    PreviewManager.update({
      textColor: textColor.value,
      positionX: parseInt(positionX.value, 10),
      positionY: parseInt(positionY.value, 10),
      scale: parseInt(scale.value, 10),
      rotation: parseInt(rotation.value, 10),
      fontFamily: fontFamily,
      fontType: currentFontType,
      shadowEnabled: shadowEnabled.checked,
      shadowBlur: parseInt(shadowBlur.value, 10),
      shadowColor: shadowColor.value,
      showComma: showComma.checked,
      backgroundWidth: parseInt(bgWidth.value, 10),
      backgroundHeight: parseInt(bgHeight.value, 10),
      previewNumber: previewValue,
    });
  }

  // ========================================================================
  // CSS生成
  // ========================================================================

  function generateCSS() {
    const fontFamily =
      currentFontType === 'google'
        ? googleFontSelect.value
        : localFontInput.value || 'sans-serif';

    const settings = {
      textColor: textColor.value,
      positionX: parseInt(positionX.value, 10),
      positionY: parseInt(positionY.value, 10),
      scale: parseInt(scale.value, 10),
      rotation: parseInt(rotation.value, 10),
      fontFamily: fontFamily,
      fontType: currentFontType,
      shadowEnabled: shadowEnabled.checked,
      shadowBlur: parseInt(shadowBlur.value, 10),
      shadowColor: shadowColor.value,
      showComma: showComma.checked,
      backgroundWidth: parseInt(bgWidth.value, 10),
      backgroundHeight: parseInt(bgHeight.value, 10),
      digitWidth: parseInt(digitWidth.value, 10),
      clipAmount: parseInt(clipAmount.value, 10),
      templateStyle: currentTemplateStyle,
    };

    const css = CSSGenerator.generate(settings, currentBackgroundImage);
    cssOutput.value = css;
  }

  // ========================================================================
  // 出力機能
  // ========================================================================

  async function copyCSS() {
    try {
      await navigator.clipboard.writeText(cssOutput.value);
      showCopyFeedback();
    } catch (error) {
      // フォールバック: 古いブラウザ対応
      cssOutput.select();
      document.execCommand('copy');
      showCopyFeedback();
    }
  }

  function showCopyFeedback() {
    copyFeedback.classList.add('copy-feedback--visible');
    setTimeout(() => {
      copyFeedback.classList.remove('copy-feedback--visible');
    }, 2000);
  }

  function showRegenerateFeedback() {
    const originalText = regenerateBtn.innerHTML;
    regenerateBtn.innerHTML = '<span class="btn-icon">✓</span> 再生成完了';
    regenerateBtn.disabled = true;
    setTimeout(() => {
      regenerateBtn.innerHTML = originalText;
      regenerateBtn.disabled = false;
    }, 1500);
  }

  function exportHTML() {
    const css = cssOutput.value;
    const html = CSSGenerator.generateHTML(css);

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'youtube-counter-test.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ========================================================================
  // 設定リセット
  // ========================================================================

  function resetSettings() {
    if (!confirm('設定をリセットしますか？\n画像もクリアされます。')) {
      return;
    }

    // ストレージをクリア
    StorageManager.reset();

    // 画像をクリア
    currentBackgroundImage = null;
    currentTemplateStyle = null;
    imageInput.value = '';
    fileName.textContent = '選択されていません';
    templateSelect.value = '';

    // デフォルト設定を読み込み
    const defaults = StorageManager.getDefaults();

    // UIを更新
    positionX.value = defaults.positionX;
    positionXNum.value = defaults.positionX;
    positionY.value = defaults.positionY;
    positionYNum.value = defaults.positionY;
    scale.value = defaults.scale;
    scaleNum.value = defaults.scale;
    textColor.value = defaults.textColor;
    textColorHex.value = defaults.textColor;
    rotation.value = defaults.rotation;
    rotationNum.value = defaults.rotation;

    shadowEnabled.checked = defaults.shadowEnabled;
    shadowBlur.value = defaults.shadowBlur;
    shadowBlurNum.value = defaults.shadowBlur;
    shadowColor.value = defaults.shadowColor;
    shadowColorHex.value = defaults.shadowColor;
    showComma.checked = defaults.showComma;
    bgWidth.value = defaults.backgroundWidth;
    bgHeight.value = defaults.backgroundHeight;
    digitWidth.value = defaults.digitWidth;
    clipAmount.value = defaults.clipAmount;

    googleFontSelect.value = defaults.fontFamily;
    localFontInput.value = '';
    currentFontType = 'google';
    activateFontTab('google');

    // 影コントロールの表示状態を更新
    updateShadowControlsVisibility();

    // サイズ表示をリセット
    resetSizeDisplay();

    // プレビューをクリア
    PreviewManager.clearBackgroundImage();

    // プレビューとCSS更新
    updatePreview();
    generateCSS();
  }

  // ========================================================================
  // モーダル制御
  // ========================================================================

  function openModal() {
    privacyModal.classList.add('modal--visible');
    document.body.style.overflow = 'hidden';
    closeModal.focus();
  }

  function closeModalHandler() {
    privacyModal.classList.remove('modal--visible');
    document.body.style.overflow = '';
  }

  // ========================================================================
  // ユーティリティ関数
  // ========================================================================

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ========================================================================
  // 初期化実行
  // ========================================================================

  init();
});
