import { app } from "hyperapp"
import { router, saveScroll } from "./core/router.js"
import { init, view, SetRoute } from "./app.js"
import { LoadUsers } from "./routes/users/actions.js"

const dispatch = app<typeof init>({
  init,
  view,
  node: document.getElementById("app") as HTMLElement,
})

router.hooks({
  before(done, match) {
    if (match?.url) saveScroll(match.url)
    done()
  },
})

router
  .on("/", () => dispatch(SetRoute, "home"))
  .on("/users", () => dispatch(LoadUsers))
  .notFound(() => dispatch(SetRoute, null))
  .resolve()
