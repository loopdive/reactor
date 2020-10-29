import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// @ts-ignore
import useMeasure from "react-use-measure/dist/web.cjs";
import mergeRefs from "react-merge-refs";
import { addAnimation } from "../../utils";

import ResizeObserver from "resize-observer-polyfill";

type Props = {
  children: ReactNode | ReactNode[];
  speed?: number;
};

// Helper function to add polyfill to useMeasure hook
export const useMeasureWithPolyfill = (): [
  (element: HTMLElement | SVGElement | null) => void,
  { width: number }
] => {
  const [ref, values] = useMeasure({ polyfill: ResizeObserver });

  return [ref, values];
};

const InfiniteCarousel: FC<Props> = ({ children, speed = 0.5 }) => {
  // Reference for carousel wrapping element
  const parent = useRef<HTMLDivElement>();

  const carouselRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      setTimeout(function () {
        el.style.animationPlayState = "running";
      }, 50);
    }
  }, [carouselRef.current]);

  // Amount of children
  const childrenCount = Array.isArray(children) ? children.length : 1;

  // Store all children widths
  const [widths, setWidths] = useState<number[]>(
    new Array(childrenCount).fill(0)
  );

  // Get the width of the container element
  const [containerRef, { width: containerWidth }] = useMeasureWithPolyfill();

  // Get the width of all elements aligned horizontally
  const [
    hiddenCarouselRef,
    { width: carouselWidth },
  ] = useMeasureWithPolyfill();

  // calculate the number of times the items in the carousel need to be
  // repeated to simulate an infinite carousel without visible gaps
  const reps = useMemo(() => repetitions(containerWidth, carouselWidth), [
    containerWidth,
    carouselWidth,
  ]);

  const setWidthsHandler = useCallback((value: number, index: number) => {
    setWidths((w) => {
      const temp = [...w];
      temp[index] = value;
      return temp;
    });
  }, []);

  // create keyframes for the animation visiting all the carousel items
  useEffect(() => {
    if (
      containerWidth > 0 &&
      carouselWidth > 0 &&
      widths[childrenCount - 1] > 0
    ) {
      const speedup = 5;
      const movementDuration = 100 / childrenCount / speedup;
      const stopDuration = (100 / childrenCount / speedup) * (speedup - 1);
      const keyframes = [];

      // Store sum of all previous indices in current index (for all children widths)
      let summedWidths = [...widths];
      summedWidths = summedWidths.map((_, index) =>
        summedWidths.slice(0, index + 1).reduce((a, b) => a + b)
      );

      for (let i = 0; i < childrenCount; i += 1) {
        const stop = (movementDuration + stopDuration) * i;
        const start = stop + stopDuration;

        keyframes.push(`
          ${stop}% {
            transform: translate3d(${
              -1 *
              (carouselWidth +
                summedWidths[i] -
                (containerWidth / 2 + widths[i] / 2))
            }px, 0, 0);
          }

          ${
            start < 100
              ? `${start}% {
            transform: translate3d(${
              -1 *
              (carouselWidth +
                summedWidths[i] -
                (containerWidth / 2 + widths[i] / 2))
            }px, 0, 0);
          }`
              : ""
          }
        `);
      }

      const keyframesSection = `@keyframes ${animationName} {
        ${keyframes.join(" ")}

        100% {
            transform: translate3d(${
              -1 *
              (2 * carouselWidth +
                widths[0] -
                (containerWidth / 2 + widths[0] / 2))
            }px, 0, 0);
        }

      }`;

      addAnimation(animationName, keyframesSection, parent.current);
    }
  }, [carouselWidth, childrenCount, widths, containerWidth]);

  // CHildren duplicated by the required repetitions
  const childrenToRender = useMemo(
    () =>
      new Array(reps).fill(0).map((_, index) => (
        <div key={index} style={{ display: "flex" }}>
          {children}
        </div>
      )),
    [reps, children]
  );

  // Render children of screen to get element widths
  const preRenderChildren = useMemo(
    () =>
      Array.isArray(children) ? (
        children.map((child, index) => (
          <CarouselItem
            key={index}
            setWidth={(value: number) => setWidthsHandler(value, index)}
          >
            {child}
          </CarouselItem>
        ))
      ) : (
        <CarouselItem setWidth={(value: number) => setWidthsHandler(value, 0)}>
          {children}
        </CarouselItem>
      ),
    [children, setWidthsHandler]
  );

  return (
    <>
      <div style={{ position: "absolute" }}>
        <div
          style={{
            display: "flex",
            visibility: "hidden",
            zIndex: -1,
          }}
          ref={hiddenCarouselRef}
        >
          {preRenderChildren}
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
          ref={carouselRef}
          style={{
            width: "100%",
            display: "flex",
            transform: "translate3d(0, 0, 0)",
            animationName,
            animationDuration: `${childrenCount / speed}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationPlayState: "paused",
          }}
        >
          {childrenToRender}
        </div>
      </div>
    </>
  );
};
export default InfiniteCarousel;

const CarouselItem: FC<{
  children: ReactNode;
  setWidth: (width: number) => void;
}> = ({ children, setWidth }) => {
  const [oldWidth, setOldWidth] = useState(0);
  const [ref, { width }] = useMeasureWithPolyfill();

  useEffect(() => {
    if (width !== oldWidth) {
      setWidth(width);
      setOldWidth(width);
    }
  }, [width, setWidth]);

  if (!children) {
    return null;
  }

  return <div ref={ref}>{children}</div>;
};

const repetitions = (viewportWidth: number, carouselWidth: number) => {
  if (viewportWidth === 0 || carouselWidth === 0) {
    return 1;
  }

  return Math.ceil(viewportWidth / carouselWidth) * 3;
};

const animationName = "interfacers-reactor-slide-animation";
