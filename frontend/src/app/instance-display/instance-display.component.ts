import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { DicomSeries } from '../_model/dicomSeries';
import { Subscription } from 'rxjs';
import { DicomInstance } from '../_model/dicomInstance';
import { tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ModalPopupPage } from '../modal-popup/modal-popup.page';
import { CornerstoneService } from '../_services/cornerstone.service';

@Component({
  selector: 'app-instance-display',
  templateUrl: './instance-display.component.html',
  styleUrls: ['./instance-display.component.scss'],
})
export class InstanceDisplayComponent implements OnInit, OnDestroy {
  seriesId: string;
  series: DicomSeries = {} as DicomSeries;
  instanceIds: string[] = [];
  instances: DicomInstance[] = [];
  subscriptions: Subscription[] = [];

  modalDataResponse: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private modalController: ModalController,
    private router: Router,
    private cornerStoneService: CornerstoneService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe((params) => {
        this.seriesId = params.get('id');
        console.log('series ID', this.seriesId);
      })
    );
    this.subscriptions.push(
      this.apiService.getStudySeries(this.seriesId).subscribe((series) => {
        this.series = series;
        this.instanceIds = this.series.Instances;
        this.cornerStoneService.loadAndStoreAllDicoms(this.instanceIds);
        for (const key in this.instanceIds) {
          if (this.instanceIds.hasOwnProperty(key)) {
            this.subscriptions.push(
              this.apiService.getInstanceById(this.instanceIds[key]).subscribe(
                (instance) => {
                  this.instances.push(instance);
                  this.instances.sort((a, b) => {
                    return (
                      +a.MainDicomTags.InstanceNumber -
                      +b.MainDicomTags.InstanceNumber
                    );
                  });
                },
                (err) => console.log(err)
              )
            );
          }
        }
      })
    );
  }

  fetchInstances(event: any) {
    // console.log(event);
  }

  previewInstance(index: number) {
    this.apiService
      .previewInstance(this.instances[index].ID)
      .subscribe((data) => console.log(data));
  }

  async initModal(index: number) {
    const selectedInstance = this.instances[index];
    const modal = await this.modalController.create({
      component: ModalPopupPage,
      componentProps: {
        instance: `Instance ${selectedInstance.MainDicomTags.InstanceNumber}`,
        instanceId: selectedInstance.ID,
      },
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : ' + modalDataResponse.data);
      }
    });

    return await modal.present();
  }

  goToViewer(index: any) {
    this.router.navigate(['viewer', index]);
    console.log(index);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
