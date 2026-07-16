import "@/app-header";
import "@/auth-nav";
import "@/color-picker";
import "@/racer-card";
import "@/racer-grid";
import "@/pages/create-page";
import "@/pages/home-page";
import "@/pages/login-page";
import "@/pages/profile-page";
import "@/pages/racer-page";

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";

@customElement("app-root")
export class AppRoot extends LitElement {
  private _router = new Router(this, [
    {
      path: "/",
      render: () => html`<home-page></home-page>`,
    },
    {
      path: "/create",
      render: () => html`<create-page></create-page>`,
    },
    {
      path: "/login",
      render: () => html`<login-page></login-page>`,
    },
    {
      path: "/profile",
      render: () => html`<profile-page></profile-page>`,
    },
    {
      path: "/racer/:racerId",
      render: ({ racerId }) =>
        html`<racer-page .racerId=${racerId}></racer-page>`,
    },
  ]);

  render() {
    return html` <div class="app-root">
      <app-header></app-header>
      ${this._router.outlet()}
    </div>`;
  }

  static styles = css`
    header {
      align-items: center;
      background-color: var(--color-white);
      display: flex;
      justify-content: space-between;
      padding: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
