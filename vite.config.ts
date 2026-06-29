import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

const repoUrl = 'https://github.com/ZhaoJun233/browser-translate'
const rawRepoUrl = 'https://raw.githubusercontent.com/ZhaoJun233/browser-translate/main'
const userscriptUrl = `${rawRepoUrl}/dist/browser-translate.user.js`

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: `${rawRepoUrl}/src/assets/logo.svg`,
        namespace: 'ZhaoJun233/browser-translate',
        homepageURL: `${repoUrl}#readme`,
        supportURL: `${repoUrl}/issues`,
        updateURL: userscriptUrl,
        downloadURL: userscriptUrl,
        match: ['*://*/*'],
      },
    }),
    UnoCSS({
      mode: 'shadow-dom',
    }),
  ],
})
