import { Injectable } from 'angular2/core';
import { Tracks } from '../../collections/tracks';

@Injectable()
export default class TrackQueueService {
  tracks;

  constructor() {
    this.tracks = [];

    Tracker.autorun(zone.bind(() => {
      this.tracks = Tracks.find().fetch();
      console.log(this.tracks);
    }))
  }

  getTracks() {
    return this.tracks;
  }

  addTrack(track): void {
    Tracks.insert(track);
  }
}
