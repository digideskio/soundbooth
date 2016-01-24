/// <reference path="../typings/angular2-meteor.d.ts" />

import { Component } from 'angular2/core';
import TrackQueueService from './services/trackqueue';
import { Tracks } from '../collections/tracks';

// 144420071

@Component({
  selector: 'track-queue',
  template: `
    <h2 class="sectionTitle">Queue</h2>
    <ul class="trackList">
      <li *ngFor="#track of tracks">
        {{ track.title }}
      </li>
    </ul>
  `
})
export default class TrackQueue {
  tracks;

  constructor() {
    this.tracks = [];

    Tracker.autorun(zone.bind(() => {
      this.tracks = Tracks.find().fetch();
    }))
  }
}
