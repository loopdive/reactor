import React, { FC, ReactNode, useEffect, useRef } from "react";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";
import { addAnimation } from "../../utils";

type Props = {
  children: ReactNode | ReactNode[];
};

const repetitions = (viewportWidth: number, carouselWidth: number) => {
  if (viewportWidth === 0 || carouselWidth === 0) {
    return 1;
  }

  if (carouselWidth > viewportWidth) {
    return 2;
  }

  let amount = 1;
  let count = carouselWidth;

  while (count < viewportWidth) {
    amount += 1;
    count += carouselWidth;
  }

  return amount * 2;
};

const animationName = "interfacers-reactor-slide-animation";

const InfiniteCarousel: FC<Props> = ({ children }) => {
  const parent = useRef<HTMLDivElement>();
  // Get the width of the container element
  const [containerRef, { width: containerWidth }] = useMeasure();

  // Get the width of all elements aligned horizontally
  const [carouselRef, { width: carouselWidth }] = useMeasure();

  const reps = repetitions(containerWidth, carouselWidth);

  useEffect(() => {
    addAnimation(
      animationName,
      `@keyframes ${animationName} {
        100% {
          transform: translate3d(-${carouselWidth}px, 0, 0);
        }
      }`,
      parent.current
    );
  }, [carouselWidth]);

  return (
    <>
      <div style={{ position: "absolute" }}>
        <div
          style={{
            display: "flex",
            visibility: "hidden",
            zIndex: -1,
          }}
          ref={carouselRef}
        >
          {children}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
        // @ts-ignore
        ref={mergeRefs([parent, containerRef])}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            transform: "translate3d(0, 0, 0)",
            animation: `${
              (Array.isArray(children) ? children.length : 1) * 2
            }s ${animationName} linear infinite`,
          }}
        >
          {new Array(reps).fill(0).map(() => children)}
        </div>
      </div>
    </>
  );
};

export default InfiniteCarousel;
