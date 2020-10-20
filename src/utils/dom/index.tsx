/** add a style element containing a keyframe animation */
export const addAnimation = (
  animation: string /** animation name */,
  keyframe: string /** keyframes string */,
  parent?: HTMLElement /** parent element of the style element */
): void => {
  let element = (parent || document).querySelector<HTMLElement>(
    `[data-animation="${animation}"]`
  );

  if (element) {
    element.innerText = keyframe;
  } else {
    element = document.createElement("style");
    element.setAttribute("data-animation", animation);
    element.innerText = keyframe;
    (parent || document.head).appendChild(element);
  }
};
