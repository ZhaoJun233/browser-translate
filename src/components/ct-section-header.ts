import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('browser-translate-section-header')
export class CtSectionHeader extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    @unocss-placeholder;
  `

  @property({ type: String }) label = ''

  override render() {
    return html`<div part="root" class="text-13px font-600 text-[#888] mb-10px">${this.label}</div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'browser-translate-section-header': CtSectionHeader
  }
}
