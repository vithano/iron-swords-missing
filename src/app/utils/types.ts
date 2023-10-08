export type PersonData = {
  id: string;
  firstName: string;
  lastName: string;
  missingPhone: string;
  image: string;
  contactName: string;
  contactPhone: string;
  status: string; //"unknown" | "found" | "deceased" | "kidnapped";
  lastSeen: string;
  identifyingDetails: string;
  notes: string;
}

export default PersonData;