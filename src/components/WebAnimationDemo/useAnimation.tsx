import { useCallback, useEffect, useRef } from "react";

export const useAnimation = (
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options?: KeyframeAnimationOptions
): {
  ref: React.MutableRefObject<HTMLDivElement | undefined>;
  animation: Animation | undefined;
  pause: () => void;
  play: () => void;
  reverse: () => void;
  playback: (value: number) => void;
  position: (percentage: number) => void;
} => {
  const ref = useRef<HTMLDivElement>();

  let { current: animation } = useRef<Animation>();

  const pause = () => animation?.pause();

  const play = () => animation?.play();

  const reverse = () => animation?.reverse();

  const playback = (value: number) => {
    if (animation) animation.playbackRate = value;
  };

  const position = useCallback((percent: number) => {
    if (animation && options?.duration) {
      if (animation.playState !== "paused") {
        pause();
      }
      animation.currentTime = Number(options.duration) * (percent / 100);
    }
  }, []);

  useEffect(() => {
    if (ref.current && keyframes) {
      animation = ref?.current?.animate(keyframes, options);
    }
  }, [ref.current, keyframes, options]);

  return {
    ref,
    animation,
    pause,
    play,
    reverse,
    playback,
    position,
  };
};
