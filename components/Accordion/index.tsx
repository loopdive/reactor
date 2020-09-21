import React, { FC, ReactNode, ElementType, useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import useMeasure from "react-use-measure";

export type Props = {
  children?: ReactNode;
  open?: boolean;
};

/** a accordion component is either open or closed and opens a rectangular are that occupies space */
export type AccordionElementType = ElementType<Props>;

export const AccordionDisplayNone: FC<Props> = ({ open, children }) => {
  const [contentHeight, setContentHeight] = useState<number>(0);

  const [ref, { height }] = useMeasure();

  const expand = useSpring({
    config: { friction: 10 },
    height: open ? contentHeight : 0,
  });

  useEffect(() => {
    //Sets initial height
    setContentHeight(height);

    //Adds resize event listener
    window.addEventListener("resize", () => setContentHeight(height));

    return () => {
      window.removeEventListener("resize", () => setContentHeight(height));
    };
  }, [height]);

  return (
    <animated.div
      style={{
        overflow: "hidden",
        ...expand,
      }}
    >
      <div ref={ref}>{children}</div>
    </animated.div>
  );
};

export const AccordionMountUnmount: FC<Props> = ({ open, children }) =>
  open ? <div>{children}</div> : null;

/**
 * user wants to be flexible
 * user wants to have reasonable defaults
 *
 */
export default AccordionDisplayNone;
