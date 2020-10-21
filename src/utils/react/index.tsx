import { ReactElement, cloneElement, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useJsx = <Props,>(element: ReactElement<Props>) => {
  return useRef((props: Props) => cloneElement(element, props)).current;
};
