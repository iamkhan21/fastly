import React from "react";

const About = () => {
  return (
    <article className="content">
      <h6>Build version: {__BUILD_VERSION__}</h6>
      <p>Uploaded at {__BUILD_DATE__}</p>
    </article>
  );
};

export default About;
