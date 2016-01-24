/// <reference path="../typings/angular2-meteor.d.ts" />

import { Component } from 'angular2/core';
import { Http } from 'angular2/http';
import { Tracks } from 'collections/tracks';

// 144420071

@Component({
  selector: 'track-queue',
  template: `
    <input type="number" #trackfield (keyup.enter)="addTrack(trackfield.value)">
    <ul class="trackList">
      <li *ngFor="#track of tracks">
        {{ track.title }}
      </li>
    </ul>
  `
})
export default class TrackQueue {
  tracks;

  constructor(private http: Http) {
    this.tracks = [];

    Tracker.autorun(zone.bind(() => {
      this.tracks = Tracks.find().fetch();
      console.log(this.tracks);
    }))
  }

  addTrack(trackID: number): void {
    this.http.get(`https://api.soundcloud.com/tracks/${trackID}?client_id=${Meteor.settings.public.soundcloudID}`)
      .subscribe(response => {
        if (response.status === 200) {
          Tracks.insert(response.json());
        }
      })
  }
}
