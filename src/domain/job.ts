export type JobUID = number;

export type Job = {
  caseDTO: { id: string };
  service: { number: JobUID; serviceId: number; status: number };
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
    number: JobUID;
    created: number;
    completeTimestamp?: number;
    estimatedTowMiles?: number;
    id: string;
    serviceId: number;
    status: number;
  };
  personalInfo: { phone: string; name: string; phoneCode: number };
  location: { address: string };
  dropOffLocation?: { address: string; name: string };
  vehicle: {
    year: string;
    vehicleClass: string;
    model: string;
    color: string;
    vin?: string;
    make: string;
  };
  provider: {
    costs: { type: string };
    phoneNumber: string;
    eta?: { duration: number; updateAt: number; receivedAt: number };
    driverId: string;
    name: string;
  };
  unreadMessageCount: number;
  countryCode: number;
  errors: {};
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

export function getJobLocation(job: SelectedJob): string | null {
  if (!job) return null;

  return job.location?.address || "Unknown location";
}

export function getTechnicianName(job: SelectedJob): string | null {
  if (!job) return null;

  return job.provider?.name || "Unnamed technician";
}

export function getTechnicianPhone(job: SelectedJob): string | null {
  if (!job) return null;

  return (job as FullJob).provider?.phoneNumber || "";
}

export function getTechnicianNameAndPhone(job: SelectedJob): string | null {
  if (!job) return null;

  const name = (job as FullJob).provider?.name;

  if (!name) return null;

  const phoneNumber = (job as FullJob).provider?.phoneNumber || "";

  return `${name} ${phoneNumber}`;
}

export function getVehicle(job: SelectedJob): string | null {
  if (!job) return null;

  const {
    make = "",
    model = "",
    color = "",
    year = "",
  } = (job as FullJob).vehicle || {};

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

  return (job as FullJob).vehicle?.vin || null;
}

export function getVehicleClass(job: SelectedJob): string | null {
  if (!job) return null;

  const { vehicleClass } = (job as FullJob).vehicle || {};

  if (!vehicleClass) return null;

  return `${vehicleClass} Duty Vehicle`;
}

export function getJobTypeId(job: SelectedJob): number | null {
  if (!job) return null;

  return (job as Job).service?.serviceId;
}

export function getJobStatus(job: SelectedJob): number | null {
  if (!job) return null;

  return (job as Job).service?.status;
}

export function getJobOffer(job: SelectedJob): string | null {
  if (!job) return null;

  return (job as FullJob).provider?.costs?.type || null;
}

export function getJobETA(job: SelectedJob): number | null {
  if (!job) return null;

  return (job as FullJob).provider?.eta?.duration || null;
}
