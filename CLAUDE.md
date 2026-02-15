# Hyperapp Boilerplate

Minimal, functional frontend boilerplate for backoffice applications.
UI language is German.

## Stack

- **Hyperapp 2** – 1kB vdom + state management, functional paradigm
- **Navigo** – vanilla JS router, lives outside Hyperapp
- **Ramda** – functional data transformation, especially `assocPath` for immutable state updates
- **Zod** – runtime validation at the API boundary
- **TypeScript** – `strict: false`, `noImplicitAny: true` – pragmatic, no overhead
- **Vite** – build tool and dev server
- **Vitest** – tests with `happy-dom` environment, mirrors `src/` structure

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm test           # vitest watch mode
npm run test:run   # run tests once (CI)
npm run coverage   # coverage report → coverage/
```

## Project Structure

```
src/
  core/
    http.ts        # FetchRoute effect – Promise.all based
    router.ts      # Navigo instance, Navigate + RestoreScroll effects
    schemas.ts     # parseOrThrow – generic Zod helper
  routes/
    home/
      index.ts     # HomeView (+ unused SetHome action)
    users/
      actions.ts   # LoadUsers, SetUsersData, SetError, fetchUsers
      schemas.ts   # UserSchema, UserListSchema + inferred types
      view.ts      # UsersView
  app.ts           # Root state (AppState), root view, SetRoute
  main.ts          # Entry point: wires Hyperapp + Navigo
  style.css
tests/             # mirrors src/ structure
  core/
    schemas.test.ts
  routes/
    users/
      actions.test.ts
      schemas.test.ts
```

## Path Aliases

`@/*` is aliased to `src/*` in both `tsconfig.json` and `vite.config.ts`.
Tests use `@/` imports (e.g. `import { parseOrThrow } from "@/core/schemas.js"`).

## Architecture

**Hyperapp and Navigo are strictly separated.** Navigo has no knowledge of Hyperapp.
The only contact point is `main.ts`: Navigo route handlers call `dispatch`.
Navigation triggered from within Hyperapp runs as an effect (`Navigate`).

**Data flow:**

```
API → Zod (parseOrThrow) → guaranteed TypeScript type → Ramda transforms → Hyperapp renders
```

**State shape:** one global `AppState` with per-route slices under `routes.*`.
Each route owns its slice – no cross-route state access.

**Effects:** all side effects (navigation, scroll restore, HTTP) are explicit Hyperapp effects –
plain functions returning `[effectFn, payload]` tuples. No hidden side effects in actions.

**Actions are pure functions.** `(state, payload) => newState` or `(state, payload) => [newState, ...effects]`.
This makes them trivially testable without mocks or setup.

## Adding a New Route

1. Create `src/routes/yourroute/` with `schemas.ts`, `actions.ts`, `view.ts`
2. Add a slice to `AppState` in `src/app.ts`
3. Add initial state to `init` in `src/app.ts`
4. Add the view to the root view in `src/app.ts`
5. Create an action that includes `RestoreScroll` effect (see Scroll Restoration section)
6. Register the route in `src/main.ts`
7. Add tests in `tests/routes/yourroute/`

## Scroll Restoration

**Automatic save:** Scroll position is saved to `sessionStorage` before every navigation via the Navigo `before` hook in `main.ts`. This happens automatically for all routes.

**Manual restore:** You must explicitly call the `RestoreScroll` effect for each route that needs it. This is intentional – it gives you control over when scroll happens (e.g., after async data is ready).

**When to restore scroll:**

1. **Routes with async data** (like `/users`):
   - Call `RestoreScroll(path)` in the success action, after data is set
   - Example: `SetUsersData` returns `[newState, RestoreScroll("users")]`
   - This ensures scroll happens after content is rendered

2. **Routes without async data** (like `/articles`, `/products`):
   - Create a dedicated action that sets the route AND restores scroll
   - Example:
     ```typescript
     export const LoadArticles = (state: AppState): [AppState, ReturnType<typeof RestoreScroll>] => [
       { ...state, currentRoute: "articles", loading: false, error: null },
       RestoreScroll("articles"),
     ];
     ```
   - Register in `main.ts`: `.on("/articles", () => dispatch(LoadArticles))`

3. **Routes that should always start at top** (like `/`):
   - Don't call `RestoreScroll` – default behavior scrolls to `(0, 0)`

**Multiple async requests:** Use `Promise.all` in `FetchRoute` – call `RestoreScroll` once, after all data is ready.

## TypeScript Notes

Zod schemas are the single source of truth for API types.
Use `z.infer<typeof YourSchema>` – never duplicate type definitions manually.

Ramda's `assocPath` returns `unknown` – cast with `as AppState` where needed.
This is the only place where we override the compiler.

When you're ready to tighten things up: set `"strict": true` in `tsconfig.json`
and work through the errors one file at a time.
