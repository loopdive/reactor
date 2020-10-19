import React, {
  cloneElement,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";
import { addAnimation } from "../../../utils";

type Props = {
  children: ReactNode | ReactNode[];
  speed?: number;
};

const InfiniteCarousel: FC<Props> = ({ children, speed = 0.5 }) => {
  // Reference for carousel wrapping element
  const parent = useRef<HTMLDivElement>();

  const carouselRef = useRef<HTMLDivElement>(null);

  // Amount of children
  const childrenCount = Array.isArray(children) ? children.length : 1;

  // Store all children widths
  const [widths, setWidths] = useState<number[]>(
    new Array(childrenCount).fill(0)
  );

  // Pause state for carousel animation
  const [pause, setPause] = useState(false);

  // Get the width of the container element
  const [containerRef, { width: containerWidth }] = useMeasure();

  // Get the width of all elements aligned horizontally
  const [hiddenCarouselRef, { width: carouselWidth }] = useMeasure();

  // The amount of times children are duplicated
  const [reps, setReps] = useState(repetitions(containerWidth, carouselWidth));

  const setWidthsHandler = (value: number, index: number) => {
    setWidths((w) => {
      const temp = [...w];
      temp[index] = value;
      return temp;
    });
  };

  useEffect(() => {
    setReps(repetitions(containerWidth, carouselWidth));
  }, [containerWidth, carouselWidth]);

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
          ${stop}%${start < 100 ? `, ${start}%` : ""} {
            transform: translate3d(${
              -1 *
              (carouselWidth +
                summedWidths[i] -
                (containerWidth / 2 + widths[i] / 2))
            }px, 0, 0);
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
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <CarouselItem
                key={index}
                setWidth={(value: number) => setWidthsHandler(value, index)}
              >
                {child}
              </CarouselItem>
            ))
          ) : (
            <CarouselItem
              setWidth={(value: number) => setWidthsHandler(value, 0)}
            >
              {children}
            </CarouselItem>
          )}
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
        onFocus={() => {}}
        onMouseOver={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        <div
          ref={carouselRef}
          style={{
            width: "100%",
            display: "flex",
            transform: "translate3d(0, 0, 0)",
            animation: `${
              childrenCount / speed
            }s ${animationName} ease-in-out infinite`,
            animationPlayState: pause ? "paused" : "running",
          }}
        >
          {new Array(reps).fill(0).map(() => children)}
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
  const [ref, { width }] = useMeasure();

  useEffect(() => {
    if (width !== oldWidth) {
      setWidth(width);
      setOldWidth(width);
    }
  }, [width, setWidth]);

  if (!children) {
    return null;
  }

  return cloneElement(<div>{children}</div>, { ref });
};

const repetitions = (viewportWidth: number, carouselWidth: number) => {
  if (viewportWidth === 0 || carouselWidth === 0) {
    return 1;
  }

  return Math.ceil(viewportWidth / carouselWidth) * 3;
};

const animationName = "interfacers-reactor-slide-animation";
