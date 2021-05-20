import { MainDicomTags } from './mainDicomTags';
import { PatientMainDicomTags } from './patientMainDicomTags';

export interface DicomStudy {
  ID: string;
  IsStable: boolean;
  LastUpdate: string;
  MainDicomTags: MainDicomTags;
  ParentPatient: string;
  PatientMainDicomTags: PatientMainDicomTags;
  Series: string[];
  Type: string;
}
