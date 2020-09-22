import React, { FC } from "react";
declare type Props = {
    size?: number;
    activated?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
declare const Hamburger: FC<Props>;
export default Hamburger;
