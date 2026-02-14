import Navigo from "navigo";

// Navigo-Instanz – lebt außerhalb von Hyperapp
export const router = new Navigo("/");

// --- Scroll-Hilfsfunktionen ---

const scrollKey = (path: string): string => `scroll:${path}`;

export const saveScroll = (path: string): void => {
  sessionStorage.setItem(
    scrollKey(path),
    JSON.stringify({ x: window.scrollX, y: window.scrollY }),
  );
};

export const restoreScroll = (path: string): void => {
  const saved = sessionStorage.getItem(scrollKey(path));
  if (saved) {
    const { x, y } = JSON.parse(saved) as { x: number; y: number };
    window.scrollTo(x, y);
  } else {
    window.scrollTo(0, 0);
  }
};

// --- Hyperapp Effect: Navigation auslösen ---

const navigateEffect = (
  _dispatch: unknown,
  { path }: { path: string },
): void => {
  router.navigate(path);
};

export const Navigate = (path: string) => [navigateEffect, { path }] as const;

// --- Hyperapp Effect: Scroll wiederherstellen ---

const restoreScrollEffect = (
  _dispatch: unknown,
  { path }: { path: string },
): void => {
  restoreScroll(path);
};

export const RestoreScroll = (path: string) =>
  [restoreScrollEffect, { path }] as const;
