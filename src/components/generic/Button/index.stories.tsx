import React, { FC, useState } from "react";
import { DefaultButton } from "../../themes/default/Button";

export default {
  title: "Button",
};

export const WithText: FC = () => {
  const [activated, setActivated] = useState(false);

  return (
    <DefaultButton
      onClick={() => setActivated((a) => !a)}
      activated={activated}
    >
      Click On Me!
    </DefaultButton>
  );
};
