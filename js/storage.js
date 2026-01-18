/**
 * Storage Manager - localStorageの管理を行うモジュール
 * 画像データは保存せず、設定値のみを保存する
 */

const StorageManager = (() => {
  const STORAGE_KEY = 'youtubeCounterCSSSettings';

  // デフォルト設定値
  const DEFAULT_SETTINGS = {
    textColor: '#EE9696',
    positionX: 50,
    positionY: 50,
    scale: 300,
    rotation: -20,
    fontType: 'google',
    fontFamily: 'Orbitron',
    shadowEnabled: true,
    shadowBlur: 10,
    shadowColor: '#6038FF',
    showComma: true,
    backgroundWidth: 1088,
    backgroundHeight: 639,
    digitWidth: 46,
    clipAmount: 20,
    template: 'frame',
  };

  /**
   * 設定を保存する
   * @param {Object} settings - 保存する設定オブジェクト
   */
  function save(settings) {
    try {
      const data = {
        settings: { ...settings },
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
      return false;
    }
  }

  /**
   * 設定を読み込む
   * @returns {Object} 保存された設定、またはデフォルト設定
   */
  function load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // デフォルト設定とマージして、新しい設定項目にも対応
        return { ...DEFAULT_SETTINGS, ...parsed.settings };
      }
    } catch (error) {
      console.error('設定の読み込みに失敗しました:', error);
    }
    return { ...DEFAULT_SETTINGS };
  }

  /**
   * 設定をリセットする
   */
  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('設定のリセットに失敗しました:', error);
      return false;
    }
  }

  /**
   * デフォルト設定を取得する
   * @returns {Object} デフォルト設定のコピー
   */
  function getDefaults() {
    return { ...DEFAULT_SETTINGS };
  }

  /**
   * 設定値を検証し、範囲外の値を補正する
   * @param {Object} settings - 検証する設定オブジェクト
   * @returns {Object} 補正された設定オブジェクト
   */
  function validate(settings) {
    const validated = { ...settings };

    // 数値の範囲を検証
    validated.positionX = clamp(settings.positionX, -100, 100);
    validated.positionY = clamp(settings.positionY, -100, 100);
    validated.scale = clamp(settings.scale, 50, 500);
    validated.rotation = clamp(settings.rotation, -45, 45);
    validated.shadowBlur = clamp(settings.shadowBlur, 0, 10);
    validated.backgroundWidth = clamp(settings.backgroundWidth, 100, 3000);
    validated.backgroundHeight = clamp(settings.backgroundHeight, 100, 3000);
    validated.digitWidth = clamp(settings.digitWidth, 10, 200);
    validated.clipAmount = clamp(settings.clipAmount, 0, 100);

    // 色の検証
    validated.textColor = validateColor(settings.textColor) || '#FFFFFF';
    validated.shadowColor = validateColor(settings.shadowColor) || '#FFFFFF';

    // ブール値の検証
    validated.shadowEnabled = Boolean(settings.shadowEnabled);
    validated.showComma = Boolean(settings.showComma);

    // フォントタイプの検証
    validated.fontType =
      settings.fontType === 'local' || settings.fontType === 'google'
        ? settings.fontType
        : 'google';

    return validated;
  }

  /**
   * 数値を指定範囲内に収める
   * @param {number} value - 対象の値
   * @param {number} min - 最小値
   * @param {number} max - 最大値
   * @returns {number} 範囲内に収められた値
   */
  function clamp(value, min, max) {
    const num = Number(value);
    if (isNaN(num)) return min;
    return Math.min(Math.max(num, min), max);
  }

  /**
   * 色コードを検証する
   * @param {string} color - 検証する色コード
   * @returns {string|null} 有効な色コード、または無効な場合はnull
   */
  function validateColor(color) {
    if (typeof color !== 'string') return null;
    const hex = color.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      return hex.toUpperCase();
    }
    return null;
  }

  // Public API
  return {
    save,
    load,
    reset,
    getDefaults,
    validate,
  };
})();

// グローバルに公開
window.StorageManager = StorageManager;
