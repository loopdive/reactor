import React, { FC } from "react";
import useMeasure from "react-use-measure";

import styled, { keyframes, css } from "styled-components";

import "./styles.css";

type Props = {
  children: JSX.Element[];
};

const repititions = (viewportWidth: number, carouselWidth: number) => {
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
const InfiniteCarousel: FC<Props> = ({ children }) => {
  const [containerRef, { width: containerWidth }] = useMeasure();

  const [carouselRef, { width: carouselWidth }] = useMeasure();

  const reps = repititions(containerWidth, carouselWidth);

  return (
    <>
      <div style={{ position: "absolute" }}>
        <div
          style={{
            display: "flex",
            opacity: 0,
            visibility: "hidden",
            zIndex: -1,
          }}
          ref={carouselRef}
        >
          {children}
        </div>
      </div>

      <div className="carousel" ref={containerRef}>
        <CarouselItems amount={children.length} carouselWidth={carouselWidth}>
          {new Array(reps).fill(0).map(() => children)}
        </CarouselItems>
      </div>
    </>
  );
};

const CarouselItems = styled.div<{ amount: number; carouselWidth: number }>`
  width: 100%;
  display: flex;
  transform: translate3d(0, 0, 0);
  animation: ${({ amount, carouselWidth }) =>
      css`
        ${amount * 2}s ${slide(carouselWidth)}
      `}
    linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const slide = (width: number) => keyframes`
  100% {
    transform: translate3d(-${width}px, 0, 0);
  }
  `;

export default InfiniteCarousel;
