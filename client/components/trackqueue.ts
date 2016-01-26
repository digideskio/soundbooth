/// <reference path="../typings/angular2-meteor.d.ts" />

import { Component } from 'angular2/core';
import { Rooms } from '../../collections/rooms';

// 144420071

@Component({
  selector: 'track-queue',
  template: `
    <h2 class="sectionTitle">Queue</h2>
    <ul class="trackQueue">
      <li *ngFor="#track of tracks" class="track" [class.track-active]="activeTrack && track.id === activeTrack.id" (click)="setCurrentTrack(track)">
        <img class="track_image" src="{{ track.artwork_url }}">
        <div class="track_text">
          <p class="track_title">{{ track.title }}</p>
          <p class="track_artist">{{ track.user.username }}</p>
        </div>
      </li>
    </ul>
  `
})
export default class TrackQueue {
  tracks;
  activeTrack;

  constructor() {
    this.tracks = [];

    Tracker.autorun(zone.bind(() => {
      let room = Rooms.findOne(1);
      this.tracks = room.tracks;
      this.activeTrack = room.activeTrack;
    }))
  }

  setCurrentTrack(track): void {
    Meteor.call('setCurrentTrack', 1, track, (err, res) => {});
  }
}
