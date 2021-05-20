import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CornerstoneService } from '../_services/cornerstone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  index;
  instanceDicoms: any[] = [];
  currentInstanceDicom: any = {};
  subscriptions: Subscription[] = [];
  element: HTMLElement;
  slideShowToggle = false;
  interval;
  playIcon = 'play';
  playIconColor = 'primary';

  constructor(
    private cornerStoneService: CornerstoneService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.cornerStoneService.instances.subscribe((instances) => {
        this.instanceDicoms = instances;
        console.log(this.instanceDicoms);
      })
    );
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe((params) => {
        this.index = params.get('index');
        console.log(this.index);
      })
    );
  }

  ngAfterViewInit() {
    this.currentInstanceDicom = this.instanceDicoms[this.index];

    console.log('current dicom instance', this.currentInstanceDicom);

    const element = document.getElementById('dicomImage');
    this.element = element;
    this.displayImage(this.instanceDicoms[this.index], this.element);
    this.element.focus();
  }

  nextInstance() {
    if (this.index < this.instanceDicoms.length - 1) {
      this.index = ++this.index;
    } else if (this.index === this.instanceDicoms.length - 1) {
      this.index = 0;
    }
    this.displayImage(this.instanceDicoms[this.index], this.element);
  }

  prevInstance() {
    if (this.index > 0 && this.index <= this.instanceDicoms.length - 1) {
      this.index = --this.index;
    } else {
      this.index = this.instanceDicoms.length - 1;
    }
    this.displayImage(this.instanceDicoms[this.index], this.element);
  }

  firstInstance() {
    this.index = 0;
    this.displayImage(this.instanceDicoms[this.index], this.element);
  }

  lastInstance() {
    this.index = this.instanceDicoms.length - 1;
    this.displayImage(this.instanceDicoms[this.index], this.element);
  }

  slideShow() {
    this.slideShowToggle = !this.slideShowToggle;

    if (this.slideShowToggle) {
      this.interval = setInterval(() => this.nextInstance(), 1000);
      this.playIcon = 'stop';
      this.playIconColor = 'danger';
    } else {
      clearInterval(this.interval);
      this.playIcon = 'play';
      this.playIconColor = 'primary';
    }
  }

  displayImage(image: any, element: any) {
    setTimeout(() => {
      this.cornerStoneService.enableElement(this.element);

      this.cornerStoneService.displayImage(
        element,
        this.instanceDicoms[this.index]
      );
    });
  }

  goToViewer() {
    window.location.href = 'http://localhost:8080';
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
