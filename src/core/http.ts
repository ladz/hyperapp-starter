import type { Action } from "hyperapp";
import type { AppState } from "../app.js";

type Dispatch = (action: Action<AppState>, payload?: unknown) => void;

const fetchRouteEffect = (
  dispatch: Dispatch,
  {
    requests,
    onDone,
    onError,
  }: {
    requests: Promise<unknown>[];
    onDone: Action<AppState>;
    onError: Action<AppState>;
  },
): void => {
  Promise.all(requests)
    .then((results) => dispatch(onDone, results))
    .catch((error: Error) => dispatch(onError, error));
};

export const FetchRoute = (
  requests: Promise<unknown>[],
  onDone: Action<AppState>,
  onError: Action<AppState>,
) => [fetchRouteEffect, { requests, onDone, onError }] as const;
