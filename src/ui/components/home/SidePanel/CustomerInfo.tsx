import React from "react";
import {
  convertVehicleClassToHR,
  getCustomerName,
  getCustomerPhone,
  getVehicle,
  getVehicleClass,
  getVehicleVinNumber,
} from "@domain/job";
import InfoLoader from "@components/home/SidePanel/InfoLoader";
import { useStore } from "effector-react";
import { $selectedJob } from "@application/jobs";
import InfoSection from "@components/home/SidePanel/InfoSection";
import { formatPhoneNumberToHR } from "@lib/utils/formatters/phone-formatter";

const CustomerInfo = () => {
  const job = useStore($selectedJob);

  return (
    <section>
      <h4 className="mb-1">Customer</h4>
      <section className="border rounded p-2 space-y-2">
        <InfoSection
          icon="i-mdi-card-account-details-outline"
          content={
            <section className="min-h-65px">
              <p className="mb-0.5">
                <InfoLoader loadData={() => getCustomerName(job)} />
              </p>
              <p>
                <InfoLoader
                  loadData={() => formatPhoneNumberToHR(getCustomerPhone(job))}
                />
              </p>
            </section>
          }
        />

        <InfoSection
          icon="i-mdi-car"
          content={
            <section className="min-h-95px">
              <p className="mb-0.5">
                <InfoLoader loadData={() => getVehicle(job)} />
              </p>
              <p className="mb-0.5">
                <InfoLoader loadData={() => getVehicleVinNumber(job)} />
              </p>
              <p className="">
                <InfoLoader
                  loadData={() => convertVehicleClassToHR(getVehicleClass(job))}
                />
              </p>
            </section>
          }
        />
      </section>
    </section>
  );
};

export default CustomerInfo;
