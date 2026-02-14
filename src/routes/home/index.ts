import { h, text, VNode } from "hyperapp"
import { AppState } from "../../app.js"
import { Navigate } from "../../core/router.js"

export const SetHome = (state: AppState): AppState => ({
  ...state,
  currentRoute: "home",
  loading: false,
  error: null,
})

export const HomeView = (): VNode<AppState> =>
  h("div", {}, [
    h("h1", {}, text("Home")),
    h("p", {}, text("Willkommen. Das ist ein minimales Hyperapp + Navigo + Ramda + Zod Boilerplate.")),
    h("p", {}, [
      text("Geh zu "),
      h(
        "a",
        {
          href: "/users",
          onclick: (state: AppState, e: MouseEvent) => {
            e.preventDefault()
            return [state, Navigate("/users")]
          },
        },
        text("Users")
      ),
    ]),
  ])
