import React, { useEffect } from "react";
import SidePanel from "@ui/components/home/SidePanel";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Map } from "mapbox-gl";
import style from "./style.module.pcss";

const Home = () => {
  useEffect(() => {
    let map: Map;

    (async () => {
      // const mapboxgl = (await import("mapbox-gl")).default;
      //
      // mapboxgl.accessToken =
      //   "pk.eyJ1Ijoib25leGVsIiwiYSI6ImNrenN1ajEycjBxemIyb21vZnppaW8zc2EifQ.B8qhY40-bIXEhuPrA8h8PQ";
      // map = new mapboxgl.Map({
      //   container: "map__section", // container ID
      //   style: "mapbox://styles/onexel/ckzswaac1001a14o60h6ef5y8",
      //   center: [-77.37239, 35.605401],
      //   zoom: 11,
      // });
    })();

    return () => {
      map?.remove();
    };
  }, []);

  return (
    <article className="relative flex justify-between h-full">
      <article className="absolute inset-0 z-0">
        <section id="map__section" className={`${style.map} h-full w-full`} />
      </article>
      <SidePanel />
    </article>
  );
};

export default Home;
