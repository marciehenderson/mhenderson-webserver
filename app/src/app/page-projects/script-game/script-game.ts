import { Injectable, Inject } from '@angular/core';
// exported injectable script
@Injectable({providedIn: 'root'})
export class ScriptGameComponent {
  container: any;
  timer: ScriptTimer;
  player: PlayerObject;
  constructor() {
    this.timer = new ScriptTimer("delay", 500, () => {console.log("hello")});
    this.player = new PlayerObject();
  }
  main() {
    // testing the timer class
    this.timer.update();
    // update container reference for player if original reference has changed
    if(this.container !== this.player.container) {
      this.player.container = this.container;
    }
    // test the player class
    this.player.update();
  }
}
// timing script
class ScriptTimer {
  // properties
  role: string; // delay or routine
  action: Function; // script to execute on timer end
  duration: number; // ms duration
  initial: number; // ms starting time
  delta: number; // ms change in time since timer start
  enabled: boolean; // can the action be executed
  constructor(role: string, duration: number, action?: Function) {
    this.role = role;
    // define default action if one wasn't provided
    if (typeof action === 'undefined') this.action = () => {}; else this.action = action;
    this.duration = duration;
    this.initial = performance.now();
    this.delta = 0;
    this.enabled = true;
  }
  update() {
    // exit early if disabled
    if(!this.enabled) return;
    // calculate the current time passed
    this.delta = performance.now() - this.initial;
    // do something if duration has passed
    if(this.delta >= this.duration) {
      // execute action
      this.action();
      switch(this.role) {
        case "delay":
          // prevent repeating action until reactivated
          this.enabled = false;
          break;
        case "routine":
          // reset timer
          this.initial = performance.now();
          this.delta = 0;
          break;
      }
    }
  }
}
// player object script
class PlayerObject {
  container: any;
  exists: boolean;
  constructor() {
    // initialize player element
    this.exists = false;
  }
  update() {
    // only use container if it isn't undefined or null'
    if(this.container) {
      // only add player element to DOM once
      if(!this.exists) {
        this.exists = true;
        // example of setting the necessary parameters for a new player object
        this.container.addElement("player", "blue", new Object({position:{x: 100, y: 30}, rotation: 0}), new Object({width:50, height: 30}));
      }
    }
  }
}
