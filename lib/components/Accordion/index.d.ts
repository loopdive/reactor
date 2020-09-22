import { FC, ReactNode, ElementType } from "react";
export declare type Props = {
  children?: ReactNode;
  open?: boolean;
};
/** a accordion component is either open or closed and opens a rectangular are that occupies space */
export declare type AccordionElementType = ElementType<Props>;
export declare const AccordionDisplayNone: FC<Props>;
export declare const AccordionMountUnmount: FC<Props>;
/**
 * user wants to be flexible
 * user wants to have reasonable defaults
 *
 */
export default AccordionDisplayNone;
