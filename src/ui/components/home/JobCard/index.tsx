import React, { FC } from "react";
import { Link } from "wouter";

interface Props {
  uid: string;
}

const JobCard: FC<Props> = ({ uid }) => {
  return (
    <Link href={`/home/${uid}`}>
      <section className="border rounded p-2 bg-dark-300">
        <h5>JobCard</h5>
      </section>
    </Link>
  );
};

export default React.memo(JobCard);
