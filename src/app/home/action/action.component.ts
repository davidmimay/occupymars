import { Component } from '@angular/core';
import { getValue, RemoteConfig, fetchAndActivate } from '@angular/fire/remote-config';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {

  homeAction:any;

  constructor(remoteConfig: RemoteConfig) {
    fetchAndActivate(remoteConfig)
    .then(() => {
      this.homeAction = getValue(remoteConfig, 'homeAction');
    })
    .catch((err) => {
      console.log('Error:', err)
    });  
  }

}
