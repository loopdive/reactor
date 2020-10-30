// generate CSS keyframes for carousel movement
export function generateCarouselKeyframes(
  widths: number[] /** widths of the carousel items */,
  movementDuration: number /** time it takes to move the carousel from one item to the next */,
  stopDuration: number /** time the carousel rests on one item */,
  carouselWidth: number /** total width of all the carousel items concatenated */,
  containerWidth: number /** width of the carousel viewport */
): string {
  const keyframes: string[] = [];
  const summedWidths: number[] = [];
  for (let i = 0; i < widths.length; ++i) {
    const lastSum =
      summedWidths.length > 0 ? summedWidths[summedWidths.length - 1] : 0;
    summedWidths.push(lastSum + widths[i]);
  }

  for (let i = 0; i < widths.length; i += 1) {
    const stop = (movementDuration + stopDuration) * i;
    const start = stop + stopDuration;

    keyframes.push(`
    ${stop}% {
      transform: translate3d(${
        -1 *
        (carouselWidth + summedWidths[i] - (containerWidth / 2 + widths[i] / 2))
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

  return `@keyframes ${animationName} {
    ${keyframes.join(" ")}

    100% {
      transform: translate3d(${
        -1 *
        (2 * carouselWidth + widths[0] - (containerWidth / 2 + widths[0] / 2))
      }px, 0, 0);
      }

    }`;
}

/** computes the number of repetitions of all carousel items necessary to fill the viewport for animating the infinite carousel */
export const computeRepetitions = (
  viewportWidth: number | undefined,
  carouselWidth: number
): number => {
  if (
    viewportWidth === undefined ||
    viewportWidth === 0 ||
    carouselWidth === 0
  ) {
    return 1;
  }

  return Math.ceil(viewportWidth / carouselWidth) * 3;
};

export const animationName = "interfacers-reactor-slide-animation";
