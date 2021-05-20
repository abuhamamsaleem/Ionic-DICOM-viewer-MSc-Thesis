import { Injectable, OnDestroy } from '@angular/core';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneMath from 'cornerstone-math';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as Hammer from 'hammerjs';

declare const cornerstone;
declare const cornerstoneTools;
declare const cornerstoneMath;
declare const cornerstoneWADOImageLoader;

@Injectable({
  providedIn: 'root',
})
export class CornerstoneService implements OnDestroy {
  private _loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loaded = this._loaded.asObservable();

  private _imageRes: BehaviorSubject<any> = new BehaviorSubject<any>({});
  imageRes = this._imageRes.asObservable();

  private _instances: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  instances = this._instances.asObservable();

  subscriptions: Subscription[] = [];

  allDicoms = [];

  constructor() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;

    try {
      const config = {
        maxWebWorkers: navigator.hardwareConcurrency || 1,
        startWebWorkersOnDemand: true,
        webWorkerPath:
          '/assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
        taskConfiguration: {
          decodeTask: {
            loadCodecsOnStartup: true,
            initializeCodecsOnStartup: false,
            codecsPath:
              '/assets/cornerstone/codecs/cornerstoneWADOImageLoaderCodecs.js',
            usePDFJS: false,
          },
          sleepTask: {
            sleepTime: 3000,
          },
        },
      };
      cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
      console.log(window);
    } catch (e) {
      console.log(e);
    }
  }

  changeLoadedState(state: boolean) {
    this._loaded.next(state);
  }

  changeImgResState(state: any) {
    this._imageRes.next(state);
  }

  changeInstancesState(state: any[]) {
    // this._instances.
    this._instances.next(state);
  }

  loadAndViewImage(imageId: any) {
    const element = document.getElementById('dicomImage');

    try {
      cornerstone.loadAndCacheImage(imageId).then((image) => {
        console.log(image);
        const viewport = cornerstone.getDefaultViewportForImage(element, image);

        cornerstone.displayImage(element, image, viewport);
      });
    } catch (e) {
      console.log(e);
    }
  }

  downloadAndView(url: string) {
    // prefix the url with wadouri: so cornerstone can find the image loader
    url = 'wadouri:' + url;

    // image enable the dicomImage element and activate a few tools
    this.loadAndViewImage(url);
  }

  loadAndStoreDicom(imageId: string) {
    try {
      cornerstone
        .loadAndCacheImage(imageId)
        .then(
          (image) => {
            this.changeImgResState(image);
            console.log(image);
          },
          (err) => console.log(err)
        )
        .then(() => console.log('done loading one dicom'));
    } catch (e) {
      console.log(e);
    }
  }

  loadAndStoreAllDicoms(instanceIds: string[]) {
    for (const key in instanceIds) {
      if (instanceIds.hasOwnProperty(key)) {
        try {
          cornerstone
            .loadAndCacheImage(
              `wadouri:http://localhost:8082/orthanc/instances/${instanceIds[key]}/file`
            )
            .then((image) => {
              this.allDicoms.push(image);
            });
        } catch (e) {
          console.log(e);
        }
      }
    }
    this.changeInstancesState(this.allDicoms);
  }

  enableElement(element: HTMLElement) {
    cornerstone.enable(element);
  }

  displayImage(element: any, image: any) {
    try {
      cornerstoneTools.init();

      const viewport = cornerstone.getDefaultViewportForImage(element, image);
      cornerstone.displayImage(element, image, viewport);

      const cornerStoneElement = document.getElementById('dicomImage');
      const handleImageRendered = (event) => {
        event.detail.element.removeEventListener(
          'cornerstoneimagerendered',
          handleImageRendered
        );

        const ZoomTool = cornerstoneTools.ZoomTool;
        cornerstoneTools.addTool(ZoomTool, {
          // Optional configuration
          configuration: {
            invert: false,
            preventZoomOutsideImage: false,
            minScale: 0.1,
            maxScale: 20.0,
          },
        });
        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });

        // const WwwcTool = cornerstoneTools.WwwcTool;
        // cornerstoneTools.addTool(WwwcTool);
        // cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
      };
      cornerStoneElement.addEventListener(
        'cornerstoneimagerendered',
        handleImageRendered
      );
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
