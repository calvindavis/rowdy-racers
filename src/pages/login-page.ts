import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("login-page")
export class LoginPage extends LitElement {
  render() {
    return html`<h1>Login</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "login-page": LoginPage;
  }
}
