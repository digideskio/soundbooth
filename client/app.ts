/// <reference path="../typings/angular2-meteor.d.ts" />

import { Component } from 'angular2/core';
import { HTTP_BINDINGS } from 'angular2/http';
import { bootstrap } from 'angular2-meteor';
import TrackQueue from './components/trackqueue';
import TrackSearch from './components/tracksearch';
import AudioPlayer from './components/audioplayer';
import Chat from './components/chat';
import TrackQueueService from './services/trackqueue';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [TrackQueue, TrackSearch, AudioPlayer, Chat]
})
class App {}

bootstrap(App, [HTTP_BINDINGS, TrackQueueService]);
