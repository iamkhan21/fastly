import React, { useEffect } from "react";
import style from "./style.module.pcss";
import { Map } from "mapbox-gl";

const BackgroundMap = () => {
  useEffect(() => {
    let map: Map;

    // (async () => {
    //   const [, mapbox] = await Promise.all([
    //     import("mapbox-gl/dist/mapbox-gl.css"),
    //     import("mapbox-gl"),
    //   ]);
    //   const mapboxgl = mapbox.default;
    //
    //   mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
    //   map = new mapboxgl.Map({
    //     container: "map__section", // container ID
    //     style: "mapbox://styles/onexel/ckzswaac1001a14o60h6ef5y8",
    //     center: [-77.37239, 35.605401],
    //     zoom: 11,
    //   });
    // })();

    return () => {
      map?.remove();
    };
  }, []);

  return (
    <article className="absolute inset-0 z-0">
      <section id="map__section" className={`${style.map} h-full w-full`} />
    </article>
  );
};

export default React.memo(BackgroundMap);
