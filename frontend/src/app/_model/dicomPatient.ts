import { PatientMainDicomTags } from './patientMainDicomTags';

export interface DicomPatient {
  ID: string;
  IsStable: boolean;
  LastUpdate: string;
  MainDicomTags: PatientMainDicomTags;
  Studies: string[];
  Type: string;
}
