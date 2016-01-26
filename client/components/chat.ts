import { Component } from 'angular2/core';
import { Rooms } from '../../collections/rooms';

@Component({
  selector: '.chat',
  template: `
    <h2 class="sectionTitle">Chat</h2>
    <div *ngFor="#message of room.messages" class="message">
      <p class="message_author">{{ message.author }}</p>
      <time class="message_time">{{ message.time | date:'shortTime' }}</time>
      <p class="message_body">{{ message.message }}</p>
      <p class="message_meta" *ngIf="message.meta">{{ message.meta }}</p>
    </div>
    <textarea (keyup.enter)="sendMessage()" [(ngModel)]="chatbox" class="chat_messageBox"></textarea>
  `
})
export default class Chat {
  room;
  chatbox: string;

  constructor() {
    this.room = {};

    Tracker.autorun(zone.bind(() => {
      this.room = Rooms.findOne(1);
    }))
  }

  sendMessage() {
    let message = {
      message: this.chatbox,
      time: Date.now(),
      author: Meteor.user().profile.name
    }

    if (message.message.toLowerCase().match(/(track|trak|suck|awful|love|hate|this)/)) {
      let song = this.room.activeTrack.title;
      let artist = this.room.activeTrack.user.username;
      message.meta = `Said during "${song}" by ${artist}`;
    }

    Meteor.call('postMessage', 1, message, (err, res) => {
      this.chatbox = '';
    });
  }
}
