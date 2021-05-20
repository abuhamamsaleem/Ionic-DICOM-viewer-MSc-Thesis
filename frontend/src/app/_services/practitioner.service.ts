import { Injectable } from '@angular/core';
import { Paging, OrderBy } from '@inclouded/fhirapi';
import { IPractitioner } from '@ahryman40k/ts-fhir-types/lib/R4';
import {
  PractitionerApi,
  FirestorePractitioner,
} from '@inclouded/fhir-practitioner';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PractitionerService {
  pracApi: PractitionerApi;

  constructor(private afs: AngularFirestore) {
    this.pracApi = new PractitionerApi(this.afs as any);
  }

  add(practitioner: IPractitioner, id?: string): Promise<any> {
    return this.pracApi.add(practitioner, id);
    return Promise.resolve(true);
  }

  getAllPractitioners(
    direction: string,
    value?: string,
    status?: string,
    groupId?: any
  ): Observable<any> {
    const orderBy: OrderBy = { orderBy: 'nameText', direction };
    if (value) {
      return this.pracApi.getPractitionerByNameSubStr(
        value,
        null,
        groupId,
        orderBy
      );
    }
    if (status) {
      return this.pracApi.getPractitionersbyActive(
        status === 'active',
        groupId,
        orderBy
      );
    }
    return this.pracApi.getPractitionersByGroupExtension(groupId, orderBy);
  }

  getPractitionersByGroupExtension(
    groupId: string,
    orderBy?: OrderBy
  ): Observable<IPractitioner[]> {
    return this.pracApi.getPractitionersByGroupExtension(groupId, orderBy);
  }

  getPractitionerByIdentifier(
    identifier: string,
    groupId?: any,
    orderBy?: OrderBy,
    paging?: Paging
  ): Observable<IPractitioner> {
    return this.pracApi.getPractitionerByIdentifier(
      identifier,
      groupId,
      orderBy,
      paging
    );
  }

  getPractitionertById(idTAJ: string) {
    return this.pracApi.getById(idTAJ);
  }

  delete(id: any): Promise<any> {
    return this.pracApi.delete(id);
  }

  update(practitioner: IPractitioner): Promise<any> {
    return this.pracApi.update(practitioner);
  }

  getPractitionersbyTelecom(
    telecom: string,
    orderBy?: OrderBy,
    paging?: Paging
  ): Observable<IPractitioner[]> {
    return this.pracApi.getPractitionersbyTelecom(telecom, orderBy, paging);
  }
}
