/// <reference path="../typings/angular2-meteor.d.ts" />

import { Component } from 'angular2/core';
import { HTTP_BINDINGS } from 'angular2/http';
import { bootstrap } from 'angular2/platform/browser';
import TrackQueue from './trackqueue';
import TrackSearch from './tracksearch';
import AudioPlayer from './audioplayer';
import Chat from './chat';
import TrackQueueService from './services/trackqueue';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [TrackQueue, TrackSearch, AudioPlayer, Chat]
})
class App {}

bootstrap(App, [HTTP_BINDINGS, TrackQueueService]);
