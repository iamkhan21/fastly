import { Email, UID } from "@lib/types";

export type OrganizationUID = UID;

export type Organization = {
  id: OrganizationUID;
  phoneNumber: string;
  name: string;
  street: string;
  mainContact: string;
  contactTitle: string;
  email: Email;
};
