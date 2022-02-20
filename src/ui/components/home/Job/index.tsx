import React, { FC, useEffect } from "react";

interface Props {
  uid: string;
}

const Job: FC<Props> = ({ uid }) => {
  useEffect(() => {
    console.log(uid);
  }, []);

  return (
    <article>
      <p>Job {uid}</p>
    </article>
  );
};

export default Job;
