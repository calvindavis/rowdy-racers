import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

import type { Racer } from "@/types/Racer";

@customElement("racer-card")
export class RacerCard extends LitElement {
  @property({ type: Object }) racer: Racer = {};

  @property({ type: String }) border1: string | undefined;
  @property({ type: String }) border2: string | undefined;
  @property({ type: String }) credit: string | undefined;
  @property({ type: String }) creditUrl: string | undefined;
  @property({ type: String }) flavour: string | undefined;
  @property({ type: String }) image: string | undefined;
  @property({ type: String }) imageCredit: string | undefined;
  @property({ type: String }) imageCreditUrl: string | undefined;
  @property({ type: String }) name: string | undefined;
  @property({ type: String }) rule: string | undefined;

  link(text: string | undefined, url: string | undefined) {
    return when(
      text && url,
      () => html`<a href="${url}">${text}</a>`,
      () => when(text, () => html`<span>${text}</span>`),
    );
  }

  willUpdate() {
    const border1 = this.border1 || this.racer.border1 || "purple";
    const border2 = this.border2 || this.racer.border2 || "orange";

    this.style.setProperty("--border-color-1", `var(--color-${border1})`);
    this.style.setProperty("--border-color-2", `var(--color-${border2})`);
  }

  render() {
    const credit = this.credit || this.racer.credit;
    const creditUrl = this.creditUrl || this.racer.creditUrl;
    const flavour = this.flavour || this.racer.flavour;
    const image = this.image || this.racer.image;
    const imageCredit = this.imageCredit || this.racer.imageCredit;
    const imageCreditUrl = this.imageCreditUrl || this.racer.imageCreditUrl;
    const name = this.name || this.racer.name;
    const rule = this.rule || this.racer.rule;

    const id = this.racer.id;
    const url = id ? `/racer/${id}` : undefined;
    const imageUrl = image || "/racer-default-image.jpg";

    return html`
      <div class="top">
        ${when(name, () => html`<div class="name">${this.link(name, url)}</div>`)}
        <img src=${imageUrl} alt="" />
      </div>

      <div class="bottom">
        ${when(flavour, () => html`<div class="flavour">${flavour}</div>`)}

        <div class="rule">${rule}</div>
      </div>

      ${when(
        credit || imageCredit,
        () =>
          html` <div class="credit">
            ${this.link(credit, creditUrl)}
            ${this.link(imageCredit, imageCreditUrl)}
          </div>`,
      )}
    `;
  }

  static styles = css`
    :host {
      --background-color: var(--color-brown);
      --border-color-1: var(--color-white);
      --border-color-2: var(--color-white);
      --border-radius: 17px;
      --border-width: 5px;
      --padding: 20px;
      --height: 502px;
      --width: 358px;

      background-color: var(--background-color);
      color: var(--color-black);
      border-radius: var(--border-radius);
      display: flex;
      flex-direction: column;
      height: var(--height);
      padding: var(--padding);
      width: var(--width);

      @media print {
        break-inside: avoid;
        page-break-inside: avoid;
        print-color-adjust: exact;
      }
    }

    .top {
      background-color: var(--color-white);
      border-radius: 15px 50px 15px 50px;
      box-shadow:
        inset 0 0 0 var(--border-width) var(--border-color-1),
        inset 0 0 0 calc(2 * var(--border-width)) var(--background-color),
        inset 0 0 0 calc(3 * var(--border-width)) var(--border-color-2);
      display: flex;
      flex-direction: column;
      height: 100%;
      margin-bottom: var(--border-width);
      padding: calc(2 * var(--border-width));
      position: relative;
    }

    .name {
      align-self: start;
      color: inherit;
      font-family: fantasy, sans-serif;
      background-color: var(--border-color-2);
      border-radius: 15px 0 99px 0;
      font-size: 32px;
      line-height: 28px;
      max-width: 60%;
      padding: 0.3em 1em 0.3em 0.5em;
      position: relative;
      text-decoration: none;
      text-transform: uppercase;
      word-break: break-word;
      z-index: 10;

      a {
        color: inherit;
        text-decoration: none;
      }
    }

    img {
      border-radius: 0 34px 0 34px;
      position: absolute;
      top: calc(3 * var(--border-width));
      right: calc(3 * var(--border-width));
      bottom: calc(3 * var(--border-width));
      left: calc(3 * var(--border-width));
      width: calc(100% - 6 * var(--border-width));
      height: calc(100% - 6 * var(--border-width));
      object-fit: cover;
    }

    .bottom {
      background-color: var(--color-white);
      border-radius: 50px 15px 50px 15px;
      box-shadow:
        inset 0 0 0 var(--border-width) var(--border-color-2),
        inset 0 0 0 calc(2 * var(--border-width)) var(--background-color),
        inset 0 0 0 calc(3 * var(--border-width)) var(--border-color-1);
      padding: calc(2 * var(--border-width));
      position: relative;
    }

    .flavour {
      position: absolute;
      top: calc(3 * var(--border-width));
      right: calc(3 * var(--border-width));
      font-size: 11px;
      padding: 0 0.667em 0.333em 1.5em;
      border-radius: 0 0 0 99px;
      text-transform: uppercase;
      text-align: right;
      background-color: var(--border-color-1);
    }

    .rule {
      text-align: center;
      padding: 40px;
      font-size: 18px;
    }

    .credit {
      color: var(--color-white);
      display: flex;
      font-size: 10px;
      justify-content: space-between;
      line-height: 10px;
      margin-top: 15px;

      a {
        color: inherit;
        text-decoration: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "racer-card": RacerCard;
  }
}
