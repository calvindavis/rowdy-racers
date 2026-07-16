import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { Task } from "@lit/task";
import { when } from "lit/directives/when.js";
import { getUser, logIn, logOut } from "@/supabase";

@customElement("auth-nav")
export class AuthNav extends LitElement {
  private _getUserTask = new Task(this, {
    task: () => getUser(),
    args: () => [],
  });

  private async _handleLogInClick() {
    const email = prompt("Enter your email address.");

    if (email) {
      await logIn(email);
      alert("A magic link will be sent to your email address.");
    } else {
      alert("Couldn't send email - try again.");
    }
  }

  private async _handleLogOutClick() {
    await logOut();
    location.reload();
  }

  render() {
    return this._getUserTask.render({
      pending: () => html`<p>Loading...</p>`,
      complete: (user) =>
        html`<div>
          ${when(
            user === null,
            () =>
              html` <button @click=${this._handleLogInClick}>Log in</button>`,
            () =>
              html`<span>${user?.email}</span
                ><button @click=${this._handleLogOutClick}>Log out</button>`,
          )}
        </div>`,
      error: (error) => html`<p>Error: ${error}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-nav": AuthNav;
  }
}
