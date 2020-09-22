export declare type Theme = {
    name: string;
    default?: boolean;
    color: {
        foreground: string;
        background: string;
        highlight: string;
    };
    switch: {
        selected: string;
        unselected: string;
        border: string;
        selector: string;
        size: number;
    };
    searchbar: {
        background: string;
        iconsColor: string;
        textColor: string;
    };
};
export declare const dark: Theme;
export declare const light: Theme;
