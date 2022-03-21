import { createSelectorCreator } from "reselect";
const selectFonts = (state) => state.font;
export const currentCustomStyleSelector = (state) => state.style;

// export const getCurrentCustomStyle = createSelectorCreator(
//     [currentCustomStyleSelector],
//     (data) => {return data[0].family}
    
// )