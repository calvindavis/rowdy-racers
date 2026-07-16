import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Task } from "@lit/task";

import { getRacers } from "@/supabase";

@customElement("home-page")
export class HomePage extends LitElement {
  private _getRacersTask = new Task(this, {
    task: async () => getRacers(),
    args: () => [],
  });

  render() {
    return this._getRacersTask.render({
      pending: () => {
        return html`<p>Loading...</p>`;
      },
      complete: (racers) => {
        return html` <racer-grid .racers=${racers}></racer-grid> `;
      },
      error: (error) => html`<p>Error: ${error}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-page": HomePage;
  }
}
