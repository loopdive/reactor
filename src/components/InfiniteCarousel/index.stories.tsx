import React, { FC } from "react";
import InfiniteCarouselV1 from ".";
import InfiniteCarouselV2 from "./v2";

export default { title: "InfiniteCarousel" };

const colors = [
  "red",
  "green",
  "blue",
  "orange",
  "purple",
  "yellow",
  "violet",
  "red",
  "green",
  "blue",
  "orange",
  "purple",
  "yellow",
  "violet",
];

export const TestInfiniteCarouselV1: FC = () => {
  return (
    <InfiniteCarouselV1
      linearMovement={{ from: { x: -1200 }, to: { x: 1200 } }}
      animationDuration="28s"
    >
      {colors.map((backgroundColor) => (
        <div
          key={backgroundColor}
          style={{ backgroundColor, height: 200, width: 300, borderRadius: 10 }}
        />
      ))}
    </InfiniteCarouselV1>
  );
};

export const TestInfiniteCarouselV2: FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: 100,
        overflow: "hidden",
      }}
    >
      <InfiniteCarouselV2 speed={0.25}>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png"
          height="100"
          width="250"
          alt=""
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
          height="100"
          width="250"
          alt=""
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png"
          height="100"
          width="250"
          alt=""
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png"
          height="100"
          width="250"
          alt=""
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png"
          height="100"
          width="250"
          alt=""
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png"
          height="100"
          width="250"
          alt=""
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png"
          height="100"
          width="250"
          alt=""
        />
      </InfiniteCarouselV2>
    </div>
  );
};
