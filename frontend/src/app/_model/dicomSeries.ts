import { MainDicomTagsSeries } from './mainDicomTagsSeries';
export interface DicomSeries {
  ExpectedNumberOfInstances: null | string;
  ID: string;
  Instances: string[];
  IsStable: boolean;
  LastUpdate: string;
  MainDicomTags: MainDicomTagsSeries;
  ParentStudy: string;
  Status: string;
  Type: string;
}
