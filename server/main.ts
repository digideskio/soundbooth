import { Tracks } from 'collections/tracks';
import { Messages } from 'collections/messages';

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
