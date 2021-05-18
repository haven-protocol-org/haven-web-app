import { createBrowserHistory } from "history";

export const history = createBrowserHistory({basename:window.location.pathname.replace(/(\/[^/]+)$/, "")});
