import React, { ElementType } from "react";
import { Theme } from "./default/colors";
export declare const useThemeSelector: (initialTheme: Theme, themes: {
    [name: string]: Theme;
}) => [React.ElementType<any>, Theme, (theme: Theme) => void];
