import { ElementType, FC, HTMLProps } from "react";
declare type Props = {
    size?: number;
    onChange: (value: string) => void;
    onFocus?: () => void;
    value: string;
    placeholder?: string;
    ariaLabel?: string;
    Input: ElementType<HTMLProps<HTMLInputElement>>;
    Container: ElementType;
};
declare const SearchBar: FC<Props>;
export default SearchBar;
