import { app } from "hyperapp";
import { init, SetRoute, view } from "./app.js";
import { router } from "./core/router.js";
import { LoadUsers } from "./routes/users/actions.js";
import { LoadArticles } from "./routes/articles/actions.js";
import { LoadProducts } from "./routes/products/actions.js";

const dispatch = app<typeof init>({
	init,
	view,
	node: document.getElementById("app") as HTMLElement,
});

router
	.on("/", () => dispatch(SetRoute, "home"))
	.on("/users", () => dispatch(LoadUsers))
	.on("/articles", () => dispatch(LoadArticles))
	.on("/products", () => dispatch(LoadProducts))
	.notFound(() => dispatch(SetRoute, null))
	.resolve();
