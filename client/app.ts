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
import RoomService from './services/room';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [TrackQueue, TrackSearch, AudioPlayer, Chat, AccountsUI]
})
class App {
  loggedIn: boolean;
  roomModalOpen: boolean;
  room;

  constructor(private roomSvc: RoomService) {
    this.roomModalOpen = false;

    Tracker.autorun(zone.bind(() => {
      this.loggedIn = Meteor.user() !== null;
      this.room = this.roomSvc.room;
    }));
  }

  toggleRoomModal() {
    this.roomModalOpen = !this.roomModalOpen;
  }

  createRoom() {
    this.roomSvc.createRoom('2');
    this.joinRoom('2');

    console.log(this.room);
  }

  joinRoom(roomID: string): void {
    this.roomSvc.changeRoom(roomID);
    this.room = this.roomSvc.room;
  }
}

bootstrap(App, [HTTP_BINDINGS, TrackQueueService, RoomService]);
