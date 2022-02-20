import React from "react";
import style from "./style.module.pcss";

const Loader = () => {
  return (
    <article className={style.spinner__holder}>
      <section data-testid="loader" className="flex flex-col items-center">
        <h1 className="mb-3">{import.meta.env.VITE_PROJECT_NAME}</h1>
        <section className={style.spinner}>
          <div />
          <div className={style.rect2} />
          <div className={style.rect3} />
          <div className={style.rect4} />
          <div className={style.rect5} />
        </section>
      </section>
    </article>
  );
};

export default Loader;
