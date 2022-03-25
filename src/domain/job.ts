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
    vehicleClass: number;
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

  return job.service?.number || null;
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

  return (job as FullJob).provider?.phoneNumber || null;
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

export function getVehicleClass(job: SelectedJob): number | null {
  if (!job) return null;
  return (job as FullJob).vehicle?.vehicleClass || null;
}

export function getJobType(job: SelectedJob): number | null {
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

enum VehicleClass {
  Light = 1,
  Heavy = 2,
  Motorcycle = 3,
}

enum VehicleClassName {
  Light = "Light Duty Vehicle",
  Heavy = "Heavy Duty Vehicle",
  Motorcycle = "Motorcycle",
}

export function convertVehicleClassToHR(
  vehicleClass: VehicleClass | null
): VehicleClassName | null {
  switch (vehicleClass) {
    case VehicleClass.Light:
      return VehicleClassName.Light;
    case VehicleClass.Heavy:
      return VehicleClassName.Heavy;
    case VehicleClass.Motorcycle:
      return VehicleClassName.Motorcycle;
    default:
      return null;
  }
}

enum JobType {
  Towing = 2001,
  JumpStart = 2003,
  Fuel = 2004,
  FlatTire = 2005,
  Winch = 2007,
  Storage = 2011,
}

enum JobTypeName {
  Fuel = "Fuel",
  Towing = "Towing",
  JumpStart = "Jump Start",
  Storage = "Storage",
  FlatTire = "Flat Tire",
  Winch = "Winch",
}

export function convertJobTypeToHR(
  jobType: JobType | null
): JobTypeName | null {
  switch (jobType) {
    case JobType.Fuel:
      return JobTypeName.Fuel;
    case JobType.Towing:
      return JobTypeName.Towing;
    case JobType.JumpStart:
      return JobTypeName.JumpStart;
    case JobType.Storage:
      return JobTypeName.Storage;
    case JobType.FlatTire:
      return JobTypeName.FlatTire;
    case JobType.Winch:
      return JobTypeName.Winch;
    default:
      return null;
  }
}

enum JobStatus {
  Completed = 8,
}

enum JobStatusName {
  Completed = "Completed By Provider",
}

export function convertJobStatusToHR(
  jobStatus: JobStatus | null
): JobStatusName | null {
  switch (jobStatus) {
    case JobStatus.Completed:
      return JobStatusName.Completed;
    default:
      return null;
  }
}
