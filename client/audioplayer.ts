import { Component } from 'angular2/core';
import TrackQueueService from './services/trackqueue';

@Component({
  selector: '.audioPlayer',
  template: `
    <audio [src]="track.stream_url" [paused]="paused" (ended)="onTrackEnd()"></audio>
    <button type="button" (click)="togglePlayState()">{{ paused ? 'Play' : 'Pause' }}</button>
    <p class="audioPlayer_title">{{ track.title }}</p>
    <p class="audioPlayer_artist">{{ track.user.username }}</p>
  `
})
export default class AudioPlayer {
  paused: boolean;
  track;

  constructor(private queue: TrackQueueService) {
    this.getCurrentTrack();
  }

  getCurrentTrack() {
    this.track = this.queue.getCurrentTrack();

    if (this.track === null) {
      this.track = {
        stream_url: '',
        title: 'Title',
        user: {
          username: 'Artist'
        }
      }
    }
  }

  togglePlayState(): void {
    this.paused = !this.paused;
  }

  onTrackEnd() {}
}
