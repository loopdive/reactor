import React, { FC, useRef } from "react";

import styled from "styled-components";
import { animated, useSprings, interpolate } from "react-spring";

import { useDrag } from "react-use-gesture";

import clamp from "lodash.clamp";
import swap from "lodash-move";

type Props = {
  items: { height: number; text: string }[];
  margin?: number;
};

const fn = ({
  items,
  order,
  down,
  originalIndex,
  curIndex = 0,
  y = 0,
  margin,
}: {
  margin: number;
  items: { height: number; text: string }[];
  order: number[];
  down?: boolean;
  originalIndex?: number;
  curIndex?: number;
  y?: number;
  height?: number;
}) => (index: number) => {
  const test = [...order]
    .slice(0, down && index === originalIndex ? curIndex : order.indexOf(index))
    .reduce((prev, current) => prev + items[current].height + margin, 0);

  return down && index === originalIndex
    ? {
        y: test + y,
        scale: 1.1,
        zIndex: 1,
        shadow: 15,
        immediate: (n: string) => n === "y" || n === "zIndex",
      }
    : {
        y: test,
        scale: 1,
        zIndex: 0,
        shadow: 1,
        immediate: false,
      };
};

const DragAndDropList: FC<Props> = ({ items, margin = 10 }) => {
  const order = useRef(items.map((_, index) => index));

  const [springs, setSprings] = useSprings<{
    y: number;
    scale: number;
    zIndex: number;
    shadow: number;
  }>(items.length, fn({ order: order.current, items, margin }));

  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      items.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);

    setSprings(
      // @ts-ignore
      fn({
        items,
        order: newOrder,
        down,
        originalIndex,
        curIndex,
        y,
        margin,
      })
    );
    if (!down) order.current = newOrder;
  });

  return (
    <Container
      style={{
        height: items.reduce(
          (prev, { height }, index) =>
            prev + height + (index === items.length - 1 ? 0 : margin),
          0
        ),
      }}
    >
      {springs.map(({ zIndex, shadow, y, scale }, i: number) => (
        <ListItem
          {...bind(i)}
          key={i}
          style={{
            height: items[i].height,
            zIndex,
            boxShadow: shadow.interpolate(
              (s: number) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            transform: interpolate(
              [y, scale],
              (y: number, s: number) => `translate3d(0,${y}px,0) scale(${s})`
            ),
          }}
        >
          {items[i].text}
        </ListItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const ListItem = styled(animated.div)`
  position: absolute;
  width: 100%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  &:nth-child(1) {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  }

  &:nth-child(2) {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  &:nth-child(3) {
    background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);
  }

  &:nth-child(4) {
    background: linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%);
  }
`;

export default DragAndDropList;
