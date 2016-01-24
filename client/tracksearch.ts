import { Component } from 'angular2/core';
import { Http } from 'angular2/http';
import TrackQueueService from './services/trackqueue';

@Component({
  selector: 'track-search',
  template: `
    <div class="trackSearch">
      <input type="search" #searchField (keyup.enter)="search(searchField.value)">
      <ul *ngFor="#result of results">
        <li (click)="queueTrack(result)">
          <strong>{{ result.title }}</strong><br>
          {{ result.user.username }}
        </li>
      </ul>
    </div>
  `
})
export default class TrackSearch {
  results;

  constructor(private http: Http, private queue: TrackQueueService) {}

  search(value: string): void {
    this.http.get(`https://api.soundcloud.com/tracks?q=${value}&client_id=${Meteor.settings.public.soundcloudID}`)
      .subscribe(response => {
        this.results = response.json();
      })
  }

  queueTrack(track): void {
    this.queue.addTrack(track);
  }
}
