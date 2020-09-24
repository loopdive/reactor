import * as React from "react";
import { FC } from "react";

import Button from "./index";

export default {
  title: "Button",
};

export const withText: FC = () => (
  <Button onChange={(): void => {}}>Click On Me!</Button>
);
