/// <reference path="../typings/angular2-meteor.d.ts" />

import { Component } from 'angular2/core';
import { HTTP_BINDINGS } from 'angular2/http';
import { bootstrap } from 'angular2-meteor';
import TrackQueue from './components/trackqueue';
import TrackSearch from './components/tracksearch';
import AudioPlayer from './components/audioplayer';
import Chat from './components/chat';
import TrackQueueService from './services/trackqueue';
import { AccountsUI } from 'meteor-accounts-ui';
import { Rooms } from '../collections/rooms';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [TrackQueue, TrackSearch, AudioPlayer, Chat, AccountsUI]
})
class App {
  loggedIn: boolean;
  roomModalOpen: boolean;
  room;

  constructor() {
    this.roomModalOpen = false;

    Tracker.autorun(zone.bind(() => {
      this.loggedIn = Meteor.user() !== null;
      this.room = Rooms.findOne(1);
    }));
  }

  toggleRoomModal() {
    this.roomModalOpen = !this.roomModalOpen;
  }
}

bootstrap(App, [HTTP_BINDINGS, TrackQueueService]);
