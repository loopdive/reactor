import React, {
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import mergeRefs from "react-merge-refs";
// @ts-ignore
import useMeasure from "react-use-measure/dist/web.cjs";
import { addAnimation } from "../../utils";
import {
  animationName,
  generateCarouselKeyframes,
  computeRepetitions,
} from "./calculations";

type Props = {
  children: ReactNode | ReactNode[];
  speed?: number;
};

const InfiniteCarousel: FC<Props> = ({ children, speed = 0.5 }) => {
  // Reference for carousel wrapping element
  const parent = useRef<HTMLDivElement>();
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselItemsRef = useRef<HTMLDivElement>(null);
  // Get the width of the container element
  const [containerRef, { width: containerWidth }] = useMeasureWithPolyfill();
  const [repetitions, setRepetitions] = useState(1);
  const [carouselWidth, setCarouselWidth] = useState(0);
  // Amount of children
  const childrenCount = Array.isArray(children) ? children.length : 1;

  useLayoutEffect(() => {
    const children = carouselItemsRef.current?.children;

    // calculate all widths of the children
    const widths: number[] = [];
    if (children) {
      for (let i = 0; i < children.length; ++i) {
        widths.push(children.item(i)?.clientWidth || 0);
      }
    }

    // calculate total width of the carousel items
    const carouselWidth = widths.reduce((acc, current) => acc + current);
    const repetitions = computeRepetitions(containerWidth, carouselWidth);

    // calculate the number of times all items in the carousel need to be
    // repeated to simulate an infinite carousel without visible gaps
    setRepetitions(repetitions);
    setCarouselWidth(carouselWidth);

    // create keyframes for the animation visiting all the carousel items
    if (containerWidth > 0 && carouselWidth > 0 && childrenCount > 0) {
      const speedup = 5;
      const movementDuration = 100 / childrenCount / speedup;
      const stopDuration = (100 / childrenCount / speedup) * (speedup - 1);

      // calculated summed up widths of individual carousel items
      addAnimation(
        animationName,
        generateCarouselKeyframes(
          widths,
          movementDuration,
          stopDuration,
          carouselWidth,
          containerWidth
        ),
        parent.current
      );
    }
  }, [
    carouselRef.current,
    containerWidth,
    carouselWidth,
    childrenCount,
    animationName,
    parent.current,
  ]);

  useEffect(() => {
    // bugfix for safari starting animation paused
    if (carouselRef.current) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.animationPlayState = "running";
        }
      }, 1000);
    }
  }, [carouselRef.current]);

  // Children duplicated by the required repetitions
  const childrenToRender = [];
  for (let i = 0; i < repetitions; ++i) {
    childrenToRender.push(
      <div
        key={i}
        ref={i === 0 ? carouselItemsRef : undefined}
        style={{ display: "flex", backfaceVisibility: "hidden" }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
      }}
      // @ts-ignore
      ref={mergeRefs([parent, containerRef])}
    >
      <div
        ref={carouselRef}
        style={{
          width: "100%",
          display: "flex",
          animationName,
          animationDuration: `${childrenCount / speed}s`,
          animationTimingFunction: "ease-in-out",
          animationDelay: "1s",
          animationIterationCount: "infinite",
          animationPlayState: "paused",
          backfaceVisibility: "hidden",
        }}
      >
        {childrenToRender}
      </div>
    </div>
  );
};
export default InfiniteCarousel;

// Helper function to add polyfill to useMeasure hook
export const useMeasureWithPolyfill = (): [
  (element: HTMLElement | SVGElement | null) => void,
  { width: number }
] => {
  return useMeasure({ polyfill: ResizeObserver });
};
