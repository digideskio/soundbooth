import { Injectable } from 'angular2/core';
import { Rooms } from '../../collections/rooms';

@Injectable()
export default class RoomService {
  room;

  constructor() {
    this.room = null;
  }

  createRoom(roomID: string): void {
    Rooms.insert({
      _id: roomID,
      activeTrack: null,
      tracks: [],
      users: [Meteor.userId()],
      messages: []
    })
  }

  changeRoom(roomID: string): void {
    this.room = Rooms.findOne(roomID) || null;
  }

  leaveRoom(): void {
    this.room = null;
  }
}
