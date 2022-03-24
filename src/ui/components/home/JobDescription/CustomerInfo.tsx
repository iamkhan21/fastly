import React from "react";
import {
  getCustomerName,
  getCustomerPhone,
  getVehicle,
  getVehicleClass,
  getVehicleVinNumber,
} from "@domain/job";
import InfoLoader from "@ui/components/home/JobDescription/InfoLoader";
import { useStore } from "effector-react";
import { $selectedJob } from "@application/jobs";

const CustomerInfo = () => {
  const job = useStore($selectedJob);

  return (
    <section>
      <h4 className="mb-1">Customer</h4>
      <section className="border rounded p-2">
        <section className="flex items-center space-x-2 min-h-18">
          <figure className={"p-1 m-1"}>
            <i
              className={
                "inline-block text-3xl icon i-mdi-card-account-details-outline"
              }
            />
          </figure>
          <section className="min-w-xs">
            <p className="mb-1">
              <InfoLoader loadData={() => getCustomerName(job)} />
            </p>
            <p>
              <InfoLoader loadData={() => getCustomerPhone(job)} />
            </p>
          </section>
        </section>
        <section className="flex items-center space-x-2 min-h-24">
          <figure className={"p-1 m-1"}>
            <i className={"inline-block text-3xl icon i-mdi-car"} />
          </figure>
          <section className="min-w-xs">
            <p className="mb-1">
              <InfoLoader loadData={() => getVehicle(job)} />
            </p>
            <p className="mb-1">
              <InfoLoader loadData={() => getVehicleVinNumber(job)} />
            </p>
            <p className="">
              <InfoLoader loadData={() => getVehicleClass(job)} />
            </p>
          </section>
        </section>
      </section>
    </section>
  );
};

export default CustomerInfo;
