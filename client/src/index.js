import { isDesktop, isDevMode } from "./constants/env";

if (isDesktop()) {
  import("./platforms/desktop").then(desktop => {
    isDevMode()
      ? desktop.startDesktopAppInDevMode()
      : desktop.startDesktopApp();
  });
} else {
  import("./platforms/web").then(web => {
    isDevMode() ? web.startWebAppInDevMode() : web.startWebApp();
  });
}
