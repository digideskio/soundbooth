import { Tracks } from 'collections/tracks';

Tracks.allow({
  insert(track: any) {
    return true;
  }
})
