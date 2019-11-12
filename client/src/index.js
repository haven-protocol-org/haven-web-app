
import * as serviceWorker from "./serviceWorker";
import {isDesktop, isDevMode} from "./constants/env";
import {startWebAppInDevMode, startWebApp} from "./platforms/web";
import {startDesktopAppInDevMode, startDesktopApp} from "./platforms/desktop";


if (isDevMode()) {

  isDesktop()? startDesktopAppInDevMode(): startWebAppInDevMode();

} else {

  isDesktop()? startDesktopApp(): startWebApp();


}



serviceWorker.unregister();
