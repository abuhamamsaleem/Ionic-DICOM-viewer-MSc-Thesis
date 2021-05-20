import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CFind } from '../_model/queries/cFind';
import { Observable } from 'rxjs';
import { CFindQuery } from '../_model/queries/cFindQuery';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseurl = 'http://localhost:8082/orthanc';
  patients: any[] = [];
  constructor(private httpClient: HttpClient) {}

  findPatientsByName(name: string): Observable<any> {
    const query: CFind = {} as CFind;

    return this.httpClient.post(`${this.baseurl}/tools/find`, query);
  }

  cFind(searchQuery: CFindQuery): Observable<any> {
    const query: CFind = {} as CFind;
    query.CaseSensitive = false;
    query.Expand = true;
    query.Level = 'Study';
    query.Limit = 0;
    query.Since = 0;
    query.Query = searchQuery;
    console.log(query);
    return this.httpClient.post(`${this.baseurl}/tools/find`, query);
  }

  getStudySeries(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}/series/${id}`);
  }

  getStudyById(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}/studies/${id}`);
  }

  getInstanceById(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}/instances/${id}`);
  }

  getInstanceTags(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}/instances/${id}/tags`);
  }

  getInstanceSimplifiedTags(id: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseurl}/instances/${id}/simplified-tags`
    );
  }

  previewInstance(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}/instances/${id}/preview`, {
      responseType: 'blob',
    });
  }

  fetchDicomImage(id: string) {
    this.httpClient.get(`${this.baseurl}/instances/${id}/file`);
  }
}
