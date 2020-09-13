import React, { FC } from "./node_modules/react";

import Button from "./index";

export default {
  title: "Button",
};

export const withText: FC = () => (
  <Button onChange={(): void => {}}>Click On Me!</Button>
);
