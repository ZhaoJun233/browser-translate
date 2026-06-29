# Browser Translate

Browser Translate is a Tampermonkey userscript for immersive bilingual page translation in Chrome. It injects a small floating button into pages, translates visible text on demand, and can show the translated text inline without replacing the original content.

This project is based on [`lete114/chrome-translate`](https://github.com/lete114/chrome-translate) and keeps the original local Chrome AI translation flow while adding TypeScript refactors around configuration storage, safer HTML rendering, and build verification.

## Features

- Bilingual page translation with original text preserved.
- Optional replace mode for showing translated content in place.
- Text selection translation popup.
- Chrome built-in Translator API and Language Detector API support.
- Optional OpenAI-compatible provider for custom API endpoints.
- LFU translation cache with cache inspection and editing in settings.
- Safer HTML mode that sanitizes translated fragments before inserting them into the page.

## Requirements

- Chrome 138 or later.
- A userscript manager such as [Tampermonkey](https://www.tampermonkey.net/).
- Chrome AI language packs may be downloaded by Chrome on first use.

## Install

1. Install Tampermonkey in Chrome.
2. Open the userscript file:
   [browser-translate.user.js](https://raw.githubusercontent.com/ZhaoJun233/browser-translate/refs/heads/main/dist/chrome-translate.user.js)
3. Confirm installation in Tampermonkey.
4. Refresh the page you want to translate, then click the floating translate button.

## Usage

- Click the floating button to start bilingual translation.
- Click it again to stop and remove injected translations.
- Open the settings button beside the floating control to change language, provider, display mode, HTML/text mode, batch size, cache, and logs.
- Select text on a page to show the quick translation button when selection translation is enabled.

## Privacy Notes

The default provider is Chrome AI, which performs translation through Chrome's built-in APIs. If you switch to the OpenAI-compatible provider, selected text or page text is sent to the configured API base URL. Review the provider configuration before enabling it on sensitive pages.

## Development

```bash
pnpm install
pnpm lint
pnpm build
```

The built userscript is written to:

```text
dist/chrome-translate.user.js
```

## Project Structure

- `src/core/renderer.ts` - page rendering, queueing, DOM observation, and safe HTML insertion.
- `src/core/textExtractor.ts` - text node extraction and inline tag placeholder handling.
- `src/components/ct-ball.ts` - floating translate control and settings integration.
- `src/components/ct-selection.ts` - selected-text translation popup.
- `src/utils/config.ts` - typed configuration defaults, normalization, and persistence.

## Validation

The current build has been verified with:

```bash
pnpm lint
pnpm build
```

## License

MIT. See [LICENSE.md](LICENSE.md).
