import { Component } from 'angular2/core';
import { Messages } from '../../collections/messages';

@Component({
  selector: '.chat',
  template: `
    <h2 class="sectionTitle">Chat</h2>
    <div *ngFor="#message of messages" class="message">
      <time class="message_time">{{ message.time | date:'shortTime' }}</time>
      <p class="message_body">{{ message.message }}</p>
    </div>
    <textarea (keyup.enter)="sendMessage()" [(ngModel)]="chatbox" class="chat_messageBox"></textarea>
  `
})
export default class Chat {
  messages;
  chatbox: string;

  constructor() {
    this.messages = {};

    Tracker.autorun(zone.bind(() => {
      this.messages = Messages.find();
    }))
  }

  sendMessage() {
    Messages.insert({
      message: this.chatbox,
      time: Date.now()
    });

    this.chatbox = '';
  }
}
