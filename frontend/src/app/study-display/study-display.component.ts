import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { Subscription } from 'rxjs';
import { DicomSeries } from '../_model/dicomSeries';
import { DicomStudy } from '../_model/dicomStudy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study-display',
  templateUrl: './study-display.component.html',
  styleUrls: ['./study-display.component.scss'],
})
export class StudyDisplayComponent implements OnInit, OnDestroy {
  studyId: string;
  study: DicomStudy = {} as DicomStudy;
  series: DicomSeries[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(
        (params) => (this.studyId = params.get('id'))
      )
    );
    this.subscriptions.push(
      this.apiService.getStudyById(this.studyId).subscribe((study) => {
        // console.log(study);
        this.study = study;
        for (const key in this.study.Series) {
          if (this.study.Series.hasOwnProperty(key)) {
            this.subscriptions.push(
              this.apiService
                .getStudySeries(this.study.Series[key])
                .subscribe((series) => {
                  // console.log(series);
                  this.series.push(series);
                })
            );
          }
        }
      })
    );
  }

  fetchSeries(event: any) {
    console.log(event);
  }

  logSeries(index: number) {
    // console.log(this.series[index]);
    this.router.navigate(['instances', this.series[index].ID]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
