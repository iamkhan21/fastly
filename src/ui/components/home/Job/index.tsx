import React, { FC, useEffect } from "react";

interface Props {
  uid: string;
}

const Job: FC<Props> = ({ uid }) => {
  useEffect(() => {}, []);

  return (
    <section className="py-2 px-4">
      <p>Job {uid}</p>
    </section>
  );
};

export default Job;
