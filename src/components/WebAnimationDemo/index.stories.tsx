import React, { FC } from "react";
import { useAnimation } from "./useAnimation";
export default { title: "WebAnimationDemo" };

export const test: FC = () => {
  const { ref, pause, play, reverse, playback, position } = useAnimation(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(359deg)" }],
    {
      duration: 1000,
      iterations: Infinity,
      easing: "linear",
    }
  );

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
