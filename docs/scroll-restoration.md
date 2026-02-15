# Scroll Restoration Implementation Notes

**Status:** Removed from codebase (not implemented)

This document describes a previous attempt to implement scroll position restoration for SPA navigation, the challenges encountered, and potential future approaches.

## Goal

When navigating between routes in a single-page application, preserve and restore the scroll position for each route. For example:
1. User scrolls down on `/articles` to position Y=500
2. User navigates to `/products`
3. User navigates back to `/articles`
4. **Expected:** scroll is restored to Y=500
5. **Actual (without implementation):** scroll resets to top

## Previous Implementation Attempts

### Attempt 1: Save in Navigo `before` hook with `match.url`

**Code:**
```typescript
router.hooks({
  before(done, match) {
    if (match?.url) saveScroll(match.url);
    done();
  },
});
```

**Problem:** `match.url` is the **destination** URL, not the current one. When navigating from `/articles` to `/users`, this saved `/articles`'s scroll position to `scroll:/users`, corrupting the destination page's data.

### Attempt 2: Save in `before` hook with `window.location.pathname`

**Code:**
```typescript
router.hooks({
  before(done) {
    saveScroll(window.location.pathname);
    done();
  },
});
```

**Problem:** When using programmatic navigation via `router.navigate()`, the URL changes **before** the `before` hook fires. So `window.location.pathname` is already the new URL, not the old one.

### Attempt 3: Save in `Navigate` effect

**Code:**
```typescript
const navigateEffect = (_dispatch: unknown, { path }: { path: string }): void => {
  saveScroll(window.location.pathname); // Save current page BEFORE navigating
  router.navigate(path);
};
```

**Status:** Also had timing issues - the exact problem wasn't fully diagnosed before removal.

## Core Challenges

1. **Timing:** When does the URL actually change relative to hooks and effects?
2. **Programmatic vs Browser Navigation:** Different timing between clicking links vs `router.navigate()`
3. **Async Content:** For routes that load data (like `/users`), scroll restore must wait until content is rendered
4. **Framework Coordination:** Navigo and Hyperapp operate independently - finding the right integration point is non-trivial

## Technical Details

### Storage Format
Scroll positions were stored in `sessionStorage`:
- Key: `scroll:/path` (e.g., `scroll:/articles`)
- Value: `{"x": 0, "y": 500}`

### Restore Strategy
Two patterns were attempted:
1. **Sync routes** (static content): Restore immediately in route action
2. **Async routes** (data fetching): Restore after data arrives in success handler

## Potential Future Approaches

If implementing scroll restoration again, consider:

1. **Track current route in state:** Maintain `previousRoute` in AppState to know which route to save
2. **Use Navigo `after` hook:** May provide better timing guarantees
3. **Delay restoration:** Use `requestAnimationFrame` or `setTimeout` to ensure DOM is ready
4. **Browser Navigation API:** Explore using `history.scrollRestoration = 'manual'` with state
5. **Third-party library:** Consider a proven scroll restoration solution

## Why Removed

After multiple iterations, the implementation still had bugs where scroll positions from one page would incorrectly appear on another page. Rather than continue debugging timing issues between Navigo and Hyperapp, the feature was removed to keep the codebase simple and reliable.

For now, all routes scroll to top on navigation (browser default behavior).

## Files Previously Modified

- `src/core/router.ts` - saveScroll, restoreScroll, RestoreScroll effect
- `src/main.ts` - Navigo hooks
- `src/routes/*/actions.ts` - RestoreScroll calls in route actions
- `CLAUDE.md` - Scroll restoration documentation

All scroll-related code has been removed.
