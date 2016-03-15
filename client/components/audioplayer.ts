import { Component, ElementRef, AfterViewInit } from 'angular2/core';
import { ngStyle } from 'angular2/common';
import TrackQueueService from '../services/trackqueue';
import RoomService from '../services/room';

declare var $;

@Component({
  selector: '.audioPlayer',
  template: `
    <div *ngIf="track" class="audioPlayer_wrapper">
      <audio src="{{ track.stream_url }}?client_id={{ clientID }}" (canplay)="player.play()" (ended)="onTrackEnd()" (timeupdate)="calculateProgressBar()" #player></audio>
      <div class="audioPlayer_progressBar" [ngStyle]="{'transform': progressBarStyle}"></div>
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
  progressBarStyle: string;
  player;
  track;

  constructor(private elem: ElementRef, private roomSvc: RoomService) {
    this.clientID = Meteor.settings.public.soundcloudID;
    this.progressBarStyle = 'scaleX(0)';

    Tracker.autorun(zone.bind(() => {
      let room = this.roomSvc.room;
      this.track = room.activeTrack;
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

  calculateProgressBar(): void {
    let value = this.player.currentTime / this.player.duration;

    this.progressBarStyle = `scaleX(${value})`;
  }

  onTrackEnd() {}
}
