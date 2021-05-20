import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { PatientsStateManagementService } from '../_services/patients-state-management.service';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';
import { DicomStudy } from '../_model/dicomStudy';

@Component({
  selector: 'app-patient-display',
  templateUrl: './patient-display.component.html',
  styleUrls: ['./patient-display.component.scss'],
})
export class PatientDisplayComponent implements OnInit, OnDestroy {
  patientName: string;
  studies: DicomStudy[] = [];
  subscription: Subscription;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private patientStateManagement: PatientsStateManagementService
  ) {}

  ngOnInit() {
    this.loadPatients();
    this.route.paramMap.subscribe(
      (params) => (this.patientName = params.get('name'))
    );
  }

  loadPatients() {
    this.subscription = this.patientStateManagement.patients.subscribe(
      (studies) => {
        this.studies = studies;
        this.studies.forEach((study) =>
          console.log(
            new Date(
              study.MainDicomTags.StudyDate.replace(/(\d{4})(\d{2})/, '$1-$2-')
            )
          )
        );
      }
    );
  }

  fetchPatients(event) {
    setTimeout(() => {
      console.log(this.patientName);
      event.target.complete();
    }, 600);
    // return;
    // this.apiService.findPatientsByName()
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  logPatient(index: number) {
    console.log(this.studies[index].ID);
    this.router.navigate(['studies', this.studies[index].ID]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
