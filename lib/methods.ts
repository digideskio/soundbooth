import { Rooms } from '../collections/rooms';

Meteor.methods({
  postMessage(roomID, message) {
    Rooms.update(roomID, {
      $push: { messages: message }
    })
  },
  queueTrack(roomID, track) {
    Rooms.update(roomID, {
      $push: { tracks: track }
    })
  },
  setCurrentTrack(roomID, track) {
    Rooms.update(roomID, {
      $set: { activeTrack: track }
    });
  }
});
