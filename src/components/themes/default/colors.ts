export type Theme = {
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

export const dark: Theme = {
  name: "dark",
  default: true,
  color: {
    foreground: "white",
    background: "rgb(30, 30, 30)",
    highlight: "rgb(63, 63, 255)",
  },
  switch: {
    selected: "rgba(0, 0, 0, 0)",
    unselected: "rgba(0, 0, 0, 0)",
    border: "white",
    selector: "orange",
    size: 16,
  },
  searchbar: {
    background: "rgba(255, 255, 255, 0.05)",
    iconsColor: "rgba(255, 255, 255, 0.25)",
    textColor: "rgba(255, 255, 255, 0.7)",
  },
};

export const light: Theme = {
  name: "light",
  color: {
    foreground: "black",
    background: "rgb(240, 240, 240)",
    highlight: "rgb(63, 63, 255)",
  },
  switch: {
    selected: "green",
    unselected: "red",
    border: "transparent",
    selector: "white",
    size: 30,
  },
  searchbar: {
    background: "rgba(0, 0, 0, 0.05)",
    iconsColor: "rgba(0, 0, 0, 0.25)",
    textColor: "rgba(0, 0, 0, 0.7)",
  },
};
