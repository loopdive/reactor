export type Theme = {
  color: {
    foreground: string;
    background: string;
    highlight: string;
  };
};

export const dark: Theme = {
  color: {
    foreground: "white",
    background: "rgb(30, 30, 30)",
    highlight: "rgb(63, 63, 255)",
  },
};

export const light: Theme = {
  color: {
    foreground: "black",
    background: "white",
    highlight: "rgb(63, 63, 255)",
  },
};
