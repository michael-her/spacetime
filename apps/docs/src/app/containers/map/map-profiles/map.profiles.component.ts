import { Component } from '@angular/core';

@Component({
  selector: 'app-map-profiles',
  templateUrl: './map.profiles.component.html',
  styleUrls: ['./map.profiles.component.scss'],
})
export class MapProfilesComponent {
  zoom1: boolean;
  zoom2: boolean;
  zoom3: boolean;

  unzoom() {
    return (this.zoom1 = this.zoom2 = this.zoom3 = false);
  }
}
