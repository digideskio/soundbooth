import { Injectable } from 'angular2/core';
import { Tracks } from '../../collections/tracks';

@Injectable()
export default class TrackQueueService {
  tracks;
  currentTrack;

  constructor() {
    this.tracks = [];
    this.currentTrack = null;

    Tracker.autorun(zone.bind(() => {
      this.tracks = Tracks.find().fetch();
    }))
  }

  getTracks() {
    return this.tracks;
  }

  addTrack(track): void {
    Tracks.insert(track);
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  changeCurrentTrack(id: number): void {
    for (let i in this.tracks) {
      if (this.tracks[i].id === id) {
        this.currentTrack = this.tracks[i];
      }
    }
  }
}
