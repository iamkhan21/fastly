export type Job = {
  caseDTO: { id: string };
  service: {
    serviceType: string;
    roundTrip: boolean;
    partnerName: string;
    alertLevel: number;
    type: string;
    demo: boolean;
    number: number;
    rateCard: string;
    dispatchOnHold: boolean;
    reuniteTowRequired: boolean;
    name: string;
    serviceId: number;
    status: number;
  };
  personalInfo: {
    firstName: string;
    name: string;
    enabled: boolean;
    textOptIn: boolean;
  };
  location: {
    address: string;
    impoundFacility: boolean;
    city: string;
    latitude: number;
    state: string;
    longitude: number;
  };
  vehicle: { color: string; year: string; model: string; make: string };
  provider: {
    validProviderDetails: boolean;
    firstName: string;
    costs: any[];
    communicationPlatformCodes: string[];
    networkName: string;
    interested: boolean;
  };
  unreadMessageCount: number;
  vipTagDTOS: any[];
  errors: {};
  alerts: any[];
};

export type FullJob = Job & {
  service: {
    expires: number;
    created: number;
    contactName: string;
    description: string;
    completeTimestamp: number;
    statusDescription: string;
    contactPhoneNumberCell: boolean;
    campaign: string;
    contactPhoneNumber: string;
    id: string;
  };
  personalInfo: {
    phone: string;
    phoneCode: number;
    language: string;
    id: string;
  };
  location: {
    zip: string;
    zipCode: string;
    country: string;
    street: string;
  };
  dropOffLocation: {
    address: string;
    impoundFacility: boolean;
    city: string;
    street: string;
    latitude: number;
    state: string;
    longitude: number;
  };
  vehicle: {
    vehicleClass: string;
    vin: string;
    id: string;
  };
  provider: {
    lastName: string;
    costs: {
      hookPrice: number;
      providerPaymentCreated: boolean;
      freeMiles: number;
      price: number;
      type: string;
      pricePerMile: number;
    }[];
    distance: number;
    truckType: string;
    latitude: number;
    providerUid: string;
    phoneNumber: string;
    eta: {};
    driverId: string;
    providerId: number;
    driverDTO: {
      uid: string;
      firstName: string;
      lastName: string;
      actionId: number;
    };
    currency: string;
    truckDTO: { offeredAt: number; truckType: string; uKey: string };
    longitude: number;
    status: number;
  };
  internalInfo: {};
  driverDTO: {
    offeredAt: number;
    offerExpires: number;
    latitude: number;
    actionId: number;
    longitude: number;
  };
  stepDTO: {
    skatesRequired: boolean;
    preInspectionRequired: boolean;
    preInspectionSkipRequired: boolean;
    preInspectionSignatureRequired: boolean;
    jobMetricResponseRequired: boolean;
    postInspectionVideoRequired: boolean;
    postInspectionRequired: boolean;
    preServiceIndemnityFormRequired: boolean;
    postInspectionPhotoCount: number;
    preServiceDocketFormRequired: boolean;
    considerDriverDocuments: boolean;
    postServiceDocketFormRequired: boolean;
    providerLeftSiteStatusRequired: boolean;
    postInspectionType: string;
    postServiceIndemnityFormRequired: boolean;
    postInspectionSkipRequired: boolean;
    addAdditionalCostEnabled: boolean;
    preInspectionVideoRequired: boolean;
    addAdditionalCostDocumentUploadCount: number;
    postInspectionSignatureRequired: boolean;
  };
  countryCode: number;
  declineReasons: any[];
  communicationChannel: {
    driverEndPoint: { endPoint: string };
    customerEndPoint: { endPoint: string };
  };
  dispatchCommunicationChannel: { customerEndPoint: { endPoint: string } };
  step: {
    skatesRequired: boolean;
    preInspectionRequired: boolean;
    preInspectionSkipRequired: boolean;
    preInspectionSignatureRequired: boolean;
    jobMetricResponseRequired: boolean;
    postInspectionVideoRequired: boolean;
    postInspectionRequired: boolean;
    preServiceIndemnityFormRequired: boolean;
    postInspectionPhotoCount: number;
    preServiceDocketFormRequired: boolean;
    considerDriverDocuments: boolean;
    postServiceDocketFormRequired: boolean;
    providerLeftSiteStatusRequired: boolean;
    postInspectionType: string;
    postServiceIndemnityFormRequired: boolean;
    postInspectionSkipRequired: boolean;
    addAdditionalCostEnabled: boolean;
    preInspectionVideoRequired: boolean;
    addAdditionalCostDocumentUploadCount: number;
    postInspectionSignatureRequired: boolean;
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

  const { state, city } = job.location || {};
  if (!city) return "Unknown location";
  return `${city}, ${state}`;
}

export function getTechnicianName(job: SelectedJob): string {
  return job?.provider?.firstName?.replace(",", "") || "Unnamed technician";
}

export function getVehicleDescription(job: SelectedJob): string | null {
  if (!job) return null;

  const { make = "", model = "", color = "", year = "" } = job.vehicle || {};

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

export function getJobTypeName(job: SelectedJob): string | null {
  if (!job) return null;

  return (job as Job)?.service?.name;
}

export function getJobTypeId(job: SelectedJob): number | null {
  if (!job) return null;

  return (job as Job)?.service?.serviceId;
}

export function getJobStatus(job: SelectedJob): number | null {
  if (!job) return null;

  return (job as Job)?.service?.status;
}
