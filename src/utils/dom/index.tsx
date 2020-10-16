export const addAnimation = (
  animation: string,
  keyframe: string,
  parent?: HTMLElement
): void => {
  let element = document.querySelector<HTMLElement>(
    `[data-animation="${animation}"`
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
