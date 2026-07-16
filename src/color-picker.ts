import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { COLORS } from "./constants";

@customElement("color-picker")
export class ColorPicker extends LitElement {
  @property({ type: String })
  name: String | null = null;

  @property({ type: String })
  value: String | null = null;

  @property({ type: Array<String> })
  options = COLORS;

  _handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  render() {
    return repeat(
      this.options,
      (option) => option,
      (option) =>
        html`<input
          type="radio"
          name=${this.name}
          value=${option}
          .checked=${option === this.value}
          @input=${this._handleInput}
          style="background-color: var(--color-${option});"
        />`,
    );
  }

  static styles = css`
    input {
      appearance: none;
      width: 20px;
      height: 20px;
    }

    input:checked {
      outline: 1px solid black;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "color-picker": ColorPicker;
  }
}
