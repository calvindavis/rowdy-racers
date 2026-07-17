import { getRacersByUserId, getUser } from "@/supabase";
import { Task } from "@lit/task";
import type { User } from "@supabase/supabase-js";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("profile-page")
export class ProfilePage extends LitElement {
  private _getRacersTask = new Task(this, {
    task: async () => {
      const user = (await getUser()) as User;
      const userId = user?.id as string;
      const racers = await getRacersByUserId(userId);
      return { user, racers };
    },
    args: () => [],
  });

  render() {
    return html`<h1>Profile</h1>
      ${this._getRacersTask.render({
        pending: () => html`<p>Loading...</p>`,
        complete: ({ user, racers }) =>
          html`<p>Email: ${user.email}</p>
            <h2>My racers</h2>
            <racer-grid .racers=${racers}></racer-grid>`,
      })} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "profile-page": ProfilePage;
  }
}
