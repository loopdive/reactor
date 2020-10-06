import React, { FC } from "react";
import Masonry from ".";

export default { title: "Masonry" };

export const testMasonry: FC = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        padding: 10,
        boxSizing: "border-box",
      }}
    >
      <Masonry data={data} />
    </div>
  );
};

const data = [
  {
    css:
      "url(https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 300,
  },
  {
    css:
      "url(https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 350,
  },
  {
    css:
      "url(https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 320,
  },
  {
    css:
      "url(https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 300,
  },
  {
    css:
      "url(https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 370,
  },
  {
    css:
      "url(https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 400,
  },
  {
    css:
      "url(https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 430,
  },
  {
    css:
      "url(https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 350,
  },
  {
    css:
      "url(https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 480,
  },
  {
    css:
      "url(https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 430,
  },
  {
    css:
      "url(https://images.pexels.com/photos/30000/pexels-photo-30000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 520,
  },
  {
    css:
      "url(https://images.pexels.com/photos/249074/pexels-photo-249074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 500,
  },
  {
    css:
      "url(https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 430,
  },
  {
    css:
      "url(https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    height: 350,
  },
];
