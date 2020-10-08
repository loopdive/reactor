import React, { FC } from "react";
import { useAnimation } from "./useAnimation";
export default { title: "WebAnimationDemo" };

export const test: FC = () => {
  const { ref, pause, play, reverse, playback, position } = useAnimation<
    HTMLDivElement
  >([{ transform: "rotate(0deg)" }, { transform: "rotate(359deg)" }], {
    duration: 1000,
    iterations: Infinity,
    easing: "linear",
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button onClick={pause}>Pause</button>
      <button onClick={play}>Play</button>
      <button onClick={reverse}>Reverse</button>
      <input
        id="range"
        type="range"
        min="0"
        max="5"
        defaultValue={1}
        step="1"
        onInput={(value) => playback(Number(value.currentTarget.value))}
      />
      <input
        id="range"
        type="range"
        min="0"
        max="100"
        defaultValue={0}
        step="1"
        onInput={(value) => position(Number(value.currentTarget.value))}
      />
      <div
        ref={ref}
        style={{
          height: 100,
          width: 100,
          borderRadius: "100%",
          border: "4px solid black",
          borderTop: "4px solid white",
        }}
      />
    </div>
  );
};

export const chaining: FC = () => {
  const { ref } = useAnimation<SVGRectElement>(
    [
      { transform: "translate3d(0, 0, 0)" },
      { transform: "translate3d(100px, 0, 0)" },
    ],
    {
      duration: 1000,
      iterations: 1,
    }
  );
  return (
    <svg width="200" height="250">
      <rect
        ref={ref}
        x="10"
        y="10"
        width="30"
        height="30"
        stroke="black"
        fill="transparent"
        strokeWidth="2"
      />

      <circle
        cx="25"
        cy="75"
        r="18"
        stroke="red"
        fill="transparent"
        strokeWidth="2"
      />

      <line x1="10" x2="50" y1="110" y2="150" stroke="orange" strokeWidth="2" />

      <polygon
        points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
        stroke="green"
        fill="transparent"
        strokeWidth="2"
      />
    </svg>
  );
};
