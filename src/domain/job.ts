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

export function getJobNumber(job: Job): number {
  return job.service.number;
}

export function getCustomerName(job: Job | FullJob | null): string | null {
  if (!job) return null;
  return job.personalInfo?.name || "Unnamed customer";
}

export function getCar(job: Job): string {
  const { make, model } = job.vehicle || {};
  if (!make) return "Unknown vehicle model";
  return `${make} ${model}`;
}

export function getCityAndState(job: Job): string {
  const { state, city } = job.location || {};
  if (!city) return "Unknown location";
  return `${city}, ${state}`;
}

export function getTechnicianName(job: Job): string {
  return job?.provider?.firstName?.replace(",", "") || "Unnamed technician";
}

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

export function getCustomerPhone(job: FullJob) {
  if (!job) return null;

  const { phone, phoneCode } = job.personalInfo;
  if (!phone || !phoneCode) return null;

  return `+${phoneCode} ${phone}`;
}
