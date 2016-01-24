/// <reference path="../typings/angular2-meteor.d.ts" />

import { Component } from 'angular2/core';
import TrackQueueService from '../services/trackqueue';
import { Tracks } from '../../collections/tracks';

// 144420071

@Component({
  selector: 'track-queue',
  template: `
    <h2 class="sectionTitle">Queue</h2>
    <ul class="trackQueue">
      <li *ngFor="#track of tracks" class="track">
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
  currentTrackID: number;

  constructor() {
    this.tracks = [];

    Tracker.autorun(zone.bind(() => {
      this.tracks = Tracks.find().fetch();
    }))
  }

  getCurrentTrack(): void {
    // this.currentTrackID =
  }
}
