import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

import type { Racer } from "@/types/Racer";

@customElement("racer-card")
export class RacerCard extends LitElement {
  @property({ type: Object })
  racer: Racer = {};

  link(text: string | undefined, url: string | undefined) {
    return when(
      text && url,
      () => html`<a href="${url}">${text}</a>`,
      () => when(text, () => html`<span>${text}</span>`),
    );
  }

  willUpdate() {
    this.style.setProperty(
      "--border-color-1",
      `var(--color-${this.racer?.border1})`,
    );

    this.style.setProperty(
      "--border-color-2",
      `var(--color-${this.racer?.border2})`,
    );
  }

  render() {
    const {
      credit,
      creditUrl,
      id,
      image,
      imageCredit,
      imageCreditUrl,
      name,
      ruleDescription,
      ruleTitle,
    } = this.racer;
    const url = id ? `/racer/${id}` : undefined;
    const imageUrl = image || "/racer-default-image.jpg";

    return html` <div class="container">
      <div class="top">
        ${when(name, () => html`<div class="name">${this.link(name, url)}</div>`)}
        <img src=${imageUrl} alt="" />
      </div>

      <div class="bottom">
        ${when(
          ruleTitle,
          () => html`<div class="rule-title">${ruleTitle}</div>`,
        )}

        <div class="rule">${ruleDescription}</div>
      </div>

      ${when(
        credit || imageCredit,
        () =>
          html` <div class="credit">
            ${this.link(credit, creditUrl)}
            ${this.link(imageCredit, imageCreditUrl)}
          </div>`,
      )}
    </div>`;
  }

  static styles = css`
    *,
    :host {
      box-sizing: border-box;
    }

    :host {
      --background-color: var(--color-brown);
      --border-color-1: var(--color-white);
      --border-color-2: var(--color-white);
      --card-border-radius: 17px;
      --border-width: 5px;
      --border-width-2: 10px;
      --border-width-3: 15px;
      --padding: 20px;
      --height: 542px;
      --width: 398px;
      --name-font-size: 32px;
      --name-line-height: 28px;
      --rule-font-size: 18px;
      --rule-padding: 35px;
      --rule-title-font-size: 11px;
      --border-radius-small: 15px;
      --border-radius-large: 50px;
      --image-border-radius: 35px;
      --credit-font-size: 10px;
      --credit-margin: 15px;

      color: var(--color-black);
      container-type: inline-size;
      display: block;
      width: 100%;
      aspect-ratio: calc(var(--width) / var(--height));
      overflow: hidden;
    }
      
    .container {
      background-color: var(--background-color);
      border-radius: calc(var(--card-border-radius) / var(--width) * 100cqw);
      display:flex;
      flex-direction: column;
      padding: calc(var(--padding) / var(--width) * 100cqw);
      height: 100%;
    }

    .top {
      background-color: var(--color-white);
      border-radius:
        calc(var(--border-radius-small) / var(--width) * 100cqw)
        calc(var(--border-radius-large) / var(--width) * 100cqw)
        calc(var(--border-radius-small) / var(--width) * 100cqw)
        calc(var(--border-radius-large) / var(--width) * 100cqw);
      box-shadow:
        inset 0 0 0 calc(var(--border-width) / var(--width) * 100cqw) var(--border-color-1),
        inset 0 0 0 calc(var(--border-width-2) / var(--width) * 100cqw) var(--background-color),
        inset 0 0 0 calc(var(--border-width-3) / var(--width) * 100cqw) var(--border-color-2);
      display: flex;
      flex-direction: column;
      height: 100%;
      margin-bottom: var(--border-width);
      padding: calc(var(--border-width-3) / var(--width) * 100cqw);
      position: relative;
    }

    .name {
      align-self: start;
      color: inherit;
      font-family: fantasy, sans-serif;
      background-color: var(--border-color-2);
      border-radius: 0 0 99px 0;
      font-size: calc(var(--name-font-size) / var(--width) * 100cqw);
      line-height: calc(var(--name-line-height) / var(--width) * 100cqw);
      max-width: 80%;
      padding: 0.156em 1em 0.281em 0.343em;
      position: relative;
      text-decoration: none;
      text-transform: uppercase;
      word-break: break-all;
      z-index: 10;

      a {
        color: inherit;
        text-decoration: none;
      }
        position: absolute;

    }

    ximg {
      border-radius:
        0
        calc(var(--image-border-radius) / var(--width) * 100cqw)
        0
        calc(var(--image-border-radius) / var(--width) * 100cqw);
      position: absolute;
      top: calc(var(--image-border--width-3) / var(--width) * 100cqw);
      right: calc(var(--image-border--width-3) / var(--width) * 100cqw);
      bottom: calc(var(--image-border--width-3) / var(--width) * 100cqw);
      left: calc(var(--image-border--width-3) / var(--width) * 100cqw);
      width: calc(100% - 6 * var(--border-width));
      height: calc(100% - 6 * var(--border-width));
      object-fit: cover;
    }

    img {
      display: none;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .bottom {
      background-color: var(--color-white);
      border-radius:
        calc(var(--border-radius-large) / var(--width) * 100cqw)
        calc(var(--border-radius-small) / var(--width) * 100cqw)
        calc(var(--border-radius-large) / var(--width) * 100cqw)
        calc(var(--border-radius-small) / var(--width) * 100cqw);
      box-shadow:
        inset 0 0 0 var(--border-width) var(--border-color-2),
        inset 0 0 0 var(--border-width-2) var(--background-color),
        inset 0 0 0 var(--border-width-3) var(--border-color-1);
      padding: var(--border-width-3);
      position: relative;
    }

    .rule-title {
      position: absolute;
      top: var(--border-width-3);
      right: var(--border-width-3);
      font-size: calc(var(--rule-title-font-size) / var(--width) * 100cqw);
      padding: 0 0.667em 0.333em 1.5em;
      border-radius: 0 0 0 999px;
      text-transform: uppercase;
      text-align: right;
      background-color: var(--border-color-1);
    }

    .rule {
      text-align: center;
      padding: calc(var(--rule-padding) / var(--width) * 100cqw);
      font-size: calc(var(--rule-font-size) / var(--width) * 100cqw);
    }

    .credit {
      color: var(--color-white);
      display: flex;
      font-size: calc(var(--credit-font-size) / var(--width) * 100cqw);
      justify-content: space-between;
      line-height: 1;
      margin-top: calc(var(--credit-margin) / var(--width) * 100cqw);

      a {
        color: inherit;
        text-decoration: none;
      }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "racer-card": RacerCard;
  }
}
