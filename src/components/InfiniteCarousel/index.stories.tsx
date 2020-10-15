import React, { FC } from "react";
import InfiniteCarousel from ".";

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

export const TestInfiniteCarousel: FC = () => {
  return (
    <InfiniteCarousel
      linearMovement={{ from: { x: -1200 }, to: { x: 1200 } }}
      animationDuration="28s"
    >
      {colors.map((backgroundColor) => (
        <div
          key={backgroundColor}
          style={{ backgroundColor, height: 200, width: 300, borderRadius: 10 }}
        />
      ))}
    </InfiniteCarousel>
  );
};
