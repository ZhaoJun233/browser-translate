import type { Mode } from './constant'
import { GM_getValue, GM_setValue } from '$'
import { STORAGE_CONFIG_KEY } from './constant'

export interface ChromeTranslateConfig {
  position: { x: string, y: string }
  side: 'left' | 'right'
  language: { from: string, to: string }
  provider: 'chrome' | 'openai'
  mode: 'text' | 'html'
  displayMode: Mode
  selectionTranslate: boolean
  batchSize: number
  openai: {
    apiKey: string
    baseUrl: string
    model: string
    prompt: string
    temperature: number
    maxTokens: number
  }
}

export type ConfigPatch = Partial<Omit<ChromeTranslateConfig, 'language' | 'openai' | 'position'>> & {
  language?: Partial<ChromeTranslateConfig['language']>
  openai?: Partial<ChromeTranslateConfig['openai']>
  position?: Partial<ChromeTranslateConfig['position']>
}

export const DEFAULT_CONFIG: ChromeTranslateConfig = {
  position: { x: '', y: '' },
  side: 'right',
  language: { from: 'auto', to: '' },
  provider: 'chrome',
  mode: 'text',
  displayMode: 'bilingual',
  selectionTranslate: true,
  batchSize: 6,
  openai: {
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    prompt: 'You are a professional translator. Translate the following text from {from} to {to}. Return only the translated text, no explanation, no notes. The text contains critical markup tags like <c1>, <c2>, <c3> etc. Each tag\'s opening <cN> and closing </cN> wrap a single contiguous text span. You MUST preserve ALL of these tags exactly as-is, in the exact same order and position, and keep each tag\'s content as one continuous segment. Never split a tag\'s inner content across different parts of the sentence. Never remove, merge, reorder, or restructure any of these tags in any circumstance.',
    temperature: 0.3,
    maxTokens: 1024,
  },
}

export function normalizeConfig(config: Partial<ChromeTranslateConfig> = {}): ChromeTranslateConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
    position: { ...DEFAULT_CONFIG.position, ...config.position },
    language: { ...DEFAULT_CONFIG.language, ...config.language },
    openai: { ...DEFAULT_CONFIG.openai, ...config.openai },
  }
}

export function getConfig(): ChromeTranslateConfig {
  return normalizeConfig(GM_getValue<Partial<ChromeTranslateConfig>>(STORAGE_CONFIG_KEY, DEFAULT_CONFIG))
}

export function saveConfig(config: ChromeTranslateConfig): ChromeTranslateConfig {
  const normalized = normalizeConfig(config)
  GM_setValue(STORAGE_CONFIG_KEY, normalized)
  return normalized
}

export function patchConfig(current: ChromeTranslateConfig, patch: ConfigPatch): ChromeTranslateConfig {
  const next = normalizeConfig({
    ...current,
    ...patch,
    position: { ...current.position, ...patch.position },
    language: { ...current.language, ...patch.language },
    openai: { ...current.openai, ...patch.openai },
  })
  GM_setValue(STORAGE_CONFIG_KEY, next)
  return next
}
