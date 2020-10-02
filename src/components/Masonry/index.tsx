import React, { FC, useEffect, useState } from "react";
import { useMedia } from "./useMedia";

import shuffle from "lodash.shuffle";

import useMeasure from "react-use-measure";
import { animated, useTransition } from "react-spring";

import styled from "styled-components";

type Props = {
  data: { css: string; height: number }[];
  shuffleItems?: boolean;
};

const Masonry: FC<Props> = ({ data, shuffleItems = false }) => {
  const columns = useMedia(
    [
      "(min-width: 1300px)",
      "(min-width: 1000px)",
      "(min-width: 600px)",
      "(min-width: 300px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [ref, { width }] = useMeasure();

  const [items, setItems] = useState(data);

  useEffect(() => {
    let interval: number;
    if (shuffleItems) {
      interval = setInterval(() => {
        setItems(shuffle);
      }, 10000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const heights = new Array(columns).fill(0);

  const gridItems = items.map((child) => {
    const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy = [
      (width / columns) * column,
      (heights[column] += child.height / 2) - child.height / 2,
    ]; // X = container width / number of columns * column index, Y = it's just the height of the current column
    return { ...child, xy, width: width / columns, height: child.height / 2 };
  });

  const transitions = useTransition(gridItems, (item) => item.css, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  return (
    <List ref={ref} style={{ height: Math.max(...heights) }}>
      {transitions.map(
        // @ts-ignore
        ({ item: { css: backgroundImage }, props: { xy, ...rest }, key }) => (
          // @ts-ignore
          <ItemContainer
            key={key}
            style={{
              transform: xy.interpolate(
                (x: number, y: number) => `translate3d(${x}px,${y}px,0)`
              ),
              ...rest,
            }}
          >
            <Item style={{ backgroundImage }} />
          </ItemContainer>
        )
      )}
    </List>
  );
};

export const List = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ItemContainer = styled(animated.div)`
  position: absolute;
  will-change: transform, width, height, opacity;
  padding: 15px;
`;

const Item = styled.div`
  position: relative;
  background-size: cover;
  background-color: white;
  background-position: center center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.2);
  margin: 10px;
`;

export default Masonry;
