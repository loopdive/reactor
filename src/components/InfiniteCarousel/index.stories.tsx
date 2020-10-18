import React, { FC, forwardRef } from "react";
import InfiniteCarouselV1 from "./wip";
import InfiniteCarouselV2 from "./experimental";

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

const images = [
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png",
];

const Image: FC<{ src: string }> = forwardRef<
  HTMLImageElement,
  { src: string }
>(({ src }, ref) => {
  return <img src={src} alt="" style={{ height: 100, width: 250 }} ref={ref} />;
});
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
        {images.map((src) => (
          <Image key={src} src={src} />
        ))}
      </InfiniteCarouselV2>
    </div>
  );
};
