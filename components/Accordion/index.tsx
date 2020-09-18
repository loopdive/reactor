import React, { FC, ReactNode, ElementType } from "react";

export type Props = {
  children?: ReactNode;
  open?: boolean;
  close: () => void;
};

/** a accordion component is either open or closed and opens a rectangular are that occupies space */
export type AccordionElementType = ElementType<Props>;

export const AccordionDisplayNone: FC<Props> = ({ open, children }) => (
  <div style={{ display: open ? "block" : "none" }}>{children}</div>
);

export const AccordionMountUnmount: FC<Props> = ({ open, children }) =>
  open ? <div>{children}</div> : null;

/**
 * user wants to be flexible
 * user wants to have reasonable defaults
 *
 */
export default AccordionDisplayNone;
