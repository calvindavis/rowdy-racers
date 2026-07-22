import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("error-page")
export class ErrorPage extends LitElement {
  render() {
    return html`<racer-card
      image="https://thumbs.dreamstime.com/b/dizzy-man-his-confused-head-spinning-41557657.jpg"
      flavour="404 - Not Found"
      name="Error"
      rule=${`When I navigate to ${window.location.pathname}, I am eliminated from the race.`}
    ></racer-card>`;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }

    racer-card {
      transform: translateY(25%) rotate(10deg) scale(1.5);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "error-page": ErrorPage;
  }
}
