export type Job = {
  caseDTO: { id: string };
  service: { number: number; serviceId: number; status: number };
  personalInfo: { name: string };
  location: { address: string };
  vehicle: { model: string; make: string };
  provider: { name: string };
  unreadMessageCount: number;
  vipTagDTOS: any[];
  errors: {};
  alerts: {
    severity: number;
    alertTypeId: number;
    id: number;
    priority: number;
  }[];
};

export type FullJob = {
  caseDTO: { id: string };
  service: {
    number: number;
    created: number;
    serviceId: number;
    status: number;
  };
  personalInfo: { phone: string; name: string; phoneCode: number };
  location: { address: string; latitude: number; longitude: number };
  vehicle: {
    color: string;
    year: string;
    vehicleClass: string;
    model: string;
    vin: string;
    make: string;
  };
  provider: {
    name: string;
    costs: { providerPaymentCreated: boolean; price: number; type: string }[];
    phoneNumber: string;
    eta: { duration: number; updateAt: number; receivedAt: number };
    networkName: string;
    currency: string;
    status: number;
  };
};

export type SelectedJob = Job | FullJob | null;

export function getJobNumber(job: SelectedJob): number | null {
  if (!job) return null;

  return job.service?.number;
}

export function getCustomerName(job: SelectedJob): string | null {
  if (!job) return null;
  return job.personalInfo?.name || "Unnamed customer";
}

export function getVehicleModel(job: SelectedJob): string | null {
  if (!job) return null;

  const { make, model } = job.vehicle || {};
  if (!make) return "Unknown vehicle model";

  return `${make} ${model}`;
}

export function getCityAndState(job: SelectedJob): string | null {
  if (!job) return null;

  return job.location?.address || "Unknown location";
}

export function getTechnicianName(job: SelectedJob): string {
  return job?.provider?.name || "Unnamed technician";
}

export function getVehicleDescription(job: SelectedJob): string | null {
  if (!job) return null;

  const { make = "", model = "", color = "", year = "" } = (job as FullJob).vehicle || {};

  return `${year} ${color} ${make} ${model}`.trim();
}

export function getCustomerPhone(job: SelectedJob): string | null {
  if (!job) return null;

  const { phone = "", phoneCode = "" } = (job as FullJob).personalInfo || {};

  if (!phone || !phoneCode) return null;

  return `+${phoneCode} ${phone}`;
}

export function getVehicleVinNumber(job: SelectedJob): string | null {
  if (!job) return null;

  return (job as FullJob)?.vehicle?.vin;
}

export function getVehicleClass(job: SelectedJob): string | null {
  if (!job) return null;

  const { vehicleClass } = (job as FullJob).vehicle || {};

  if (!vehicleClass) return null;

  return `${vehicleClass} Duty Vehicle`;
}

export function getJobTypeId(job: SelectedJob): number | null {
  if (!job) return null;

  return (job as Job)?.service?.serviceId;
}

export function getJobStatus(job: SelectedJob): number | null {
  if (!job) return null;

  return (job as Job)?.service?.status;
}
