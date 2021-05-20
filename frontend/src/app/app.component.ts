import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
// implements OnInit
export class AppComponent {
  constructor() // private storage: Storage
  {}
  // async ngOnInit() {
  //   // If using a custom driver:
  //   // await this.storage.defineDriver(MyCustomDriver)
  //   await this.storage.create();
  // }
}
