import { useCallback, useEffect, useRef, RefObject } from "react";

export function useAnimation<Ref extends Element>(
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options?: KeyframeAnimationOptions
): {
  ref: RefObject<Ref>;
  animation: Animation | null;
  pause: () => void;
  play: () => void;
  reverse: () => void;
  playback: (value: number) => void;
  position: (percentage: number) => void;
} {
  const ref = useRef<Ref>(null);

  let { current: animation } = useRef<Animation>(null);

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
      animation = ref?.current?.animate(keyframes, options) || null;
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
}
