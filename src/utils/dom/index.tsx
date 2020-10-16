export const addAnimation = (animation: string, keyframe: string): void => {
  let element = document.getElementById(animation);

  if (element) {
    element.innerText = keyframe;
  } else {
    element = document.createElement("style");
    element.setAttribute("id", animation);
    element.innerText = keyframe;
    document.head.appendChild(element);
  }
};
