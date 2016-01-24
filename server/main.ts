import { Tracks } from 'collections/tracks';
import { Messages } from 'collections/messages';
import { Rooms } from 'collections/rooms';
import 'lib/methods';

Tracks.allow({
  insert(track: any) {
    return true;
  }
});

Messages.allow({
  insert(track: any) {
    return true;
  }
});

Meteor.publish('messages', () => {
  return Messages.find();
});

Meteor.publish('rooms', () => {
  return Rooms.find();
})
