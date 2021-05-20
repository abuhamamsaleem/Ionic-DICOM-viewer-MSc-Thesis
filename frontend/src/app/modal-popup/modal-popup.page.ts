import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../_services/api.service';
import { DicomInstance } from '../_model/dicomInstance';
import { Subscription } from 'rxjs';
import { CornerstoneService } from '../_services/cornerstone.service';
declare const cornerstone;

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.page.html',
  styleUrls: ['./modal-popup.page.scss'],
})
export class ModalPopupPage implements OnInit, AfterViewInit, OnDestroy {
  @Input() instance: string;
  @Input() instanceId: string;

  selectedInstance: DicomInstance = {} as DicomInstance;
  instanceTags: any;
  subscriptions: Subscription[] = [];

  constructor(
    private modalController: ModalController,
    private cornerStoneService: CornerstoneService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.apiService
        .getInstanceById(this.instanceId)
        .subscribe((instance) => (this.selectedInstance = instance))
    );

    this.subscriptions.push(
      this.apiService
        .getInstanceSimplifiedTags(this.instanceId)
        .subscribe((tags) => (this.instanceTags = tags))
    );
    this.cornerStoneService.downloadAndView(
      `http://localhost:8082/orthanc/instances/${this.instanceId}/file`
    );
    console.log(this.instanceId);
  }

  ngAfterViewInit() {
    const element = document.getElementById('dicomImage');
    // cornerstone.enable(element);
    this.downloadAndView(this.instanceId);
    // console.log('enable in afterViewInit');
  }

  loadAndViewImage(imageId: any) {
    const element = document.getElementById('dicomImage');
    cornerstone.enable(element);
    // cornerstoneTools.mouseWheelInput.enable(element);
    try {
      cornerstone.loadAndCacheImage(imageId).then((image) => {
        console.log(image);
        const viewport = cornerstone.getDefaultViewportForImage(element, image);

        cornerstone.displayImage(element, image, viewport);

        // let loaded;
        // this.subscriptions.push(
        //   this.loaded.subscribe((isLoaded) => (loaded = isLoaded))
        // );
        // if (loaded === false) {
        //   cornerstoneTools.mouseInput.enable(element);
        //   cornerstoneTools.mouseWheelInput.enable(element);
        //   cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
        //   cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
        //   cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
        //   cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
        //   loaded = true;
        //   this._loaded.next(loaded);
        // }
      });
    } catch (e) {
      console.log(e);
    }
  }

  downloadAndView(instanceId: string) {
    const baseUrl = `http://localhost:8082/orthanc/instances/${instanceId}/file`;
    // prefix the url with wadouri: so cornerstone can find the image loader
    const url = 'wadouri:' + baseUrl;

    // image enable the dicomImage element and activate a few tools
    this.loadAndViewImage(url);
  }

  async close() {
    const closeModal = 'Modal Closed';
    await this.modalController.dismiss(closeModal);
  }

  fetchInstance(event: any) {
    console.log(event);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
