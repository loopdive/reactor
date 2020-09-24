import * as React from "react";
import { FC } from "react";
import styles from "./styles.module.css";
export * from "./components";

export function hello(): void {
  console?.log && console.log("hello world");
}

interface Props {
  text: string;
}

export const ExampleComponent: FC<Props> = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>;
};
