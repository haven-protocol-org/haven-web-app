import { THEME } from "../actions/types.ts";
import { dark, light, sepia } from "../../assets/styles/themes.js";


const availableThemes = {dark, light, sepia};

export default function (state = dark, action) {
  switch (action.type) {
    case THEME:
      return availableThemes[action.payload];
    default:
      return state;
  }
}
