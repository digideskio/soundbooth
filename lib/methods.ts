import { Rooms } from '../collections/rooms';

Meteor.methods({
  postMessage(roomID, message) {
    Rooms.update(roomID, {
      $push: { messages: message }
    })
  }
});
