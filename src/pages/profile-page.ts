import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("profile-page")
export class ProfilePage extends LitElement {
  render() {
    return html`<h1>Profile</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "profile-page": ProfilePage;
  }
}
