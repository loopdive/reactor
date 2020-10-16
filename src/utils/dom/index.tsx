export const addAnimation = (
  animation: string,
  keyframe: string,
  parent?: HTMLElement
): void => {
  let element = document.getElementById(animation);

  if (element) {
    element.innerText = keyframe;
  } else {
    element = document.createElement("style");
    element.setAttribute("id", animation);
    element.innerText = keyframe;
    (parent || document.head).appendChild(element);
  }
};
