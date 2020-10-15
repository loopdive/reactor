import React, { FC, ReactNode, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { animated } from "react-spring";
import useMeasure from "react-use-measure";

type Props = {
  children: ReactNode[];
  linearMovement: LinearMovement;
  animationDuration: string;
};

/**
 * we need the total travel distance = sum of the widths of all elements
 * travel distance (movement window)
 * we need the time for traveling the full distance
 */

const InfiniteCarousel: FC<Props> = ({
  children,
  linearMovement,
  animationDuration,
}) => {
  const [widths, setWidths] = useState<number[]>(
    new Array(children.length).fill(0)
  );

  console.log(widths);
  return (
    <>
      {children.map((element, index) => {
        const [ref, { width }] = useMeasure();

        useEffect(() => {
          if (width) {
            setWidths((w) => {
              const n = [...w];
              w[index] = width;
              return n;
            });
          }
        }, [width]);

        return (
          <Item
            ref={ref}
            key={index}
            delay={index * 4}
            linearMovement={linearMovement}
            animationDuration={animationDuration}
          >
            {element}
          </Item>
        );
      })}
    </>
  );
};

/* function useDelays(numberOfItems: number) {
  const w = [];
  for (let i = 0; i < numberOfItems; ++i) {
    w.push(useMeasure());
  }
  const delays = useState<number[]>([]);
  useEffect(() => {
    w.forEach(([, width]) => width);
    if (width) {
      setWidths((w) => {
        const n = [...w];
        w[index] = width;
        return n;
      });
    }
  }, [width]);
  return delays;
} */

/* export const InfiniteCarouselThomas: FC<Props> = ({ children }) => {
  console.log(measures);
  return (
    <>
      {children.map((element, index) => (
        <Item
          ref={measures[index][0]}
          key={index}
          delay={index}
          linearMovement={{ from: { x: -1200 }, to: { x: 1200 } }}
        >
          {element}
        </Item>
      ))}
    </>
  );
}; */

export default InfiniteCarousel;

type Coordinates3d = {
  x?: number;
  y?: number;
  z?: number;
};

type LinearMovement = { from: Coordinates3d; to: Coordinates3d };

const Item = styled(animated.div)<{
  linearMovement: LinearMovement;
  delay: number;
  animationDuration: string;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  animation: ${({ animationDuration }) => animationDuration} linear -${({
      delay,
    }) => delay}s ${({ linearMovement }) =>
      translationAnimation(linearMovement)} infinite;
`;

const translationAnimation = ({ from, to }: LinearMovement) => keyframes`
  0% {
    transform: translate(-50%, -50%) translate3d(${from?.x || 0}px, ${
  from?.y || 0
}px, ${from?.z || 0}px);
  }
  100% {
    transform: translate(-50%, -50%) translate3d(${to?.x || 0}px, ${
  to?.y || 0
}px, ${to?.z || 0}px);
  `;
