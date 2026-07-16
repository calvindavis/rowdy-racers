import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-header")
export class AppHeader extends LitElement {
  render() {
    return html`
      <a href="/">Fully Sick Racers</a>

      <nav>
        <a href="/">Home</a>
        <a href="/create">Create</a>
        <a href="/profile">Profile</a>
        <a href="/login">Login</a>
      </nav>
    `;
  }

  static styles = css`
    :host {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-header": AppHeader;
  }
}
