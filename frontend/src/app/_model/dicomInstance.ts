import { MainDicomTagsInstance } from './mainDicomTagsInstance';

export interface DicomInstance {
  FileSize: number;
  FileUuid: string;
  ID: string;
  IndexInSeries: number;
  MainDicomTags: MainDicomTagsInstance;
  ParentSeries: string;
  Type: string;
}
