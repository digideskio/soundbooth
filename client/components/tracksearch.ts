import { Component } from 'angular2/core';
import { Http } from 'angular2/http';
import TrackQueueService from '../services/trackqueue';

@Component({
  selector: 'track-search',
  template: `
    <div class="trackSearch">
      <h2 class="sectionTitle">Search</h2>
      <input class="trackSearch_searchField" type="search" placeholder="Search for a track" #searchField (keyup.enter)="search(searchField.value)">
      <ul class="trackSearch_results">
        <li *ngFor="#result of results" (click)="queueTrack(result)" class="track">
          <img class="track_image" src="{{ result.artwork_url }}">
          <div class="track_text">
            <p class="track_title">{{ result.title }}</p>
            <p class="track_artist">{{ result.user.username }}</p>
          </div>
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
