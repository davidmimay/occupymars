import { Component } from '@angular/core';
import { RemoteConfig, getValue, fetchAndActivate } from '@angular/fire/remote-config';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  hydroflorumTitle: any;
  hydroflorumSubtitle: any;
  hydroflorumAction: any;

  constructor(remoteConfig: RemoteConfig) {

    fetchAndActivate(remoteConfig)
    .then(() => {
      this.hydroflorumTitle = getValue(remoteConfig, 'hydroflorumTitle');
      this.hydroflorumSubtitle = getValue(remoteConfig, 'hydroflorumSubtitle');
      this.hydroflorumAction = getValue(remoteConfig, 'hydroflorumAction');
    })
    .catch((err) => {
      console.log('Error:', err)
    });

  }

}
