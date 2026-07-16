import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Task } from "@lit/task";
import { getRacer } from "@/supabase";

@customElement("racer-page")
export class RacerPage extends LitElement {
  @property({ type: String })
  racerId: string = "";

  private _getRacerTask = new Task(this, {
    task: ([racerId]) => getRacer(racerId),
    args: () => [this.racerId],
  });

  render() {
    return this._getRacerTask.render({
      pending: () => html`<p>Loading...</p>`,
      complete: (racer) => html`<racer-card .racer=${racer}></racer-card>`,
      error: (error) => html`<p>Error: ${error}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "racer-page": RacerPage;
  }
}
