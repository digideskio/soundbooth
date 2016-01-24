/// <reference path="../typings/angular2-meteor.d.ts" />

import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html'
})
class App {}

bootstrap(App);
