import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";
import { $selectedJob, loadJobDetailsFx } from "@application/jobs";
import {getCustomerName, getCustomerPhone} from "@domain/job";

interface Props {
  uid: string;
}

interface InfoProps {
  loadData: (...data: any) => any;
}

const InfoLoad: FC<InfoProps> = ({ loadData }) => {
  const isLoading = useStore(loadJobDetailsFx.pending);

  return loadData() ?? (isLoading && <span>loading</span>);
};

const Job: FC<Props> = ({ uid }) => {
  const job = useStore($selectedJob);

  useEffect(() => {}, []);

  return (
    <section className="py-2 px-4">
      <section>
        <h4>Customer</h4>
        <section className="border rounded h-15">
          <p>
            <InfoLoad loadData={() => getCustomerName(job)} />
          </p>
          <p>
            <InfoLoad loadData={() => getCustomerPhone(job)} />
          </p>
        </section>
      </section>
      <p>Job {uid}</p>
    </section>
  );
};

export default Job;
