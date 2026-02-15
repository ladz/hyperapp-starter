import Navigo from "navigo";

// Navigo-Instanz – lebt außerhalb von Hyperapp
export const router = new Navigo("/");

// --- Hyperapp Effect: Navigation auslösen ---

const navigateEffect = (
	_dispatch: unknown,
	{ path }: { path: string },
): void => {
	router.navigate(path);
};

export const Navigate = (path: string) => [navigateEffect, { path }] as const;
