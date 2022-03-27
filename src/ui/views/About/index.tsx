import React from "react";

const About = () => {
  return (
    <article className="content">
      <section>
        <h6>App build (v.{__BUILD_VERSION__.slice(0, 8)})</h6>
        <p>Uploaded at {__BUILD_DATE__}</p>
      </section>
    </article>
  );
};

export default About;
