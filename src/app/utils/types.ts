export type PersonData = {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  contactName: string;
  contactPhone: string;
  status: string; //"unknown" | "found" | "deceased" | "kidnapped";
  lastSeen: string;
  identifyingDetails: string;
  notes: string;
}
export type PersonDataSql = {
  id: string;
  first_name: string;
  last_name: string;
  image: string;
  contact_name: string;
  contact_phone: string;
  status: string;
  last_seen: string;
  details: string;
  notes: string;
}

export default PersonData;