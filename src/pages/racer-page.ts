import { css, html, LitElement } from "lit";
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
      complete: (racer) => html`
        <div class="medium">
          <racer-card .racer=${racer}></racer-card>
        </div>
        <div class="small">
          <racer-card .racer=${racer}></racer-card>
        </div>
        <div class="large">
          <racer-card .racer=${racer}></racer-card>
        </div>
      `,
      error: (error) => html`<p>Error: ${error}</p>`,
    });
  }

  static styles = css`
    :host {
      display: flex;
      gap: 40px;
      flex-wrap: wrap;
      padding: 40px;
    }

    div {
      outline: 10px dashed black;
    }

    .large {
      width: 600px;
      //display: none;
    }
    .medium {
      width: var(--racer-card-width);
    }
    .small {
      width: 200px;
      //display: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "racer-page": RacerPage;
  }
}
