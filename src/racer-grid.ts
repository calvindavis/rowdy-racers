import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import type { Racer } from "@/types/Racer";

@customElement("racer-grid")
export class RacerGrid extends LitElement {
  @property()
  racers: Racer[] | null = null;

  render() {
    return repeat(
      this.racers || [],
      (_, index) => index,
      (racer) => html`<racer-card .racer=${racer}></racer-card>`,
    );
  }

  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "racer-grid": RacerGrid;
  }
}
