export type Theme = {
  name: string;
  default?: boolean;
  color: {
    foreground: string;
    background: string;
    highlight: string;
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
};

export const light: Theme = {
  name: "light",
  color: {
    foreground: "black",
    background: "rgb(240, 240, 240)",
    highlight: "rgb(63, 63, 255)",
  },
};
