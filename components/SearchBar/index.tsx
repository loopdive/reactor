import React, { ElementType, FC, HTMLProps } from "react";

type Props = {
  size?: number;
  onChange: (value: string) => void;
  onFocus?: () => void;
  value: string;
  placeholder?: string;
  ariaLabel?: string;
  Input: ElementType<HTMLProps<HTMLInputElement>>;
  Container: ElementType;
};

const SearchBar: FC<Props> = ({
  placeholder = "Search",
  value,
  ariaLabel,
  onChange,
  onFocus,
  Input,
  Container,
}) => {
  return (
    <Container showDeleteIcon={value !== ""} onDelete={() => onChange("")}>
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            //  @ts-ignore
            e.target.blur();
          }
        }}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
      />
    </Container>
  );
};

export default SearchBar;
