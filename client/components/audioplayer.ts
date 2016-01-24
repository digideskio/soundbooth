import { Component, ElementRef, AfterViewInit } from 'angular2/core';
import TrackQueueService from '../services/trackqueue';
import { Rooms } from '../../collections/rooms';

declare var $;

@Component({
  selector: '.audioPlayer',
  template: `
    <div *ngIf="track" class="audioPlayer_wrapper">
      <audio src="{{ track.stream_url }}?client_id={{ clientID }}" (canplay)="player.play()" (ended)="onTrackEnd()" #player></audio>
      <img [src]="track.artwork_url" class="audioPlayer_image">
      <button type="button" (click)="togglePlayState()" class="audioPlayer_button fa" [class.fa-play-circle]="player.paused" [class.fa-pause-circle]="!player.paused">{{ player.paused ? 'Play' : 'Pause' }}</button>
      <div class="audioPlayer_text">
        <p class="audioPlayer_title">{{ track.title }}</p>
        <p class="audioPlayer_artist">{{ track.user.username }}</p>
      </div>
    </div>
  `
})
export default class AudioPlayer implements AfterViewInit {
  paused: boolean;
  clientID: string;
  player;
  track;

  constructor(private elem: ElementRef) {
    this.clientID = Meteor.settings.public.soundcloudID;

    Tracker.autorun(zone.bind(() => {
      let room = Rooms.findOne(1);
      this.track = room.activeTrack || null;
    }))
  }

  ngAfterViewInit() {
    this.player = this.elem.nativeElement.querySelector('audio');
  }

  togglePlayState(): void {
    if (this.player.paused) {
      this.player.play();
    }
    else {
      this.player.pause();
    }
  }

  onTrackEnd() {}
}
