import React, { FC, forwardRef } from "react";
import InfiniteCarousel from ".";

export default { title: "InfiniteCarousel" };

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
export const TestInfiniteCarousel: FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: 100,
        overflow: "hidden",
      }}
    >
      <InfiniteCarousel>
        {images.map((src) => (
          <Image key={src} src={src} />
        ))}
      </InfiniteCarousel>
    </div>
  );
};
