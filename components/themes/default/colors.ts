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
};
