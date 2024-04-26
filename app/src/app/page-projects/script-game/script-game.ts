import { Injectable } from '@angular/core';
// exported injectable script
@Injectable({providedIn: 'root'})
export class ScriptGameComponent {
  container: any;
  timer: ScriptTimer;
  player: PlayerObject;
  constructor() {
    this.timer = new ScriptTimer("delay", 500, () => {console.log("hello")});
    this.player = new PlayerObject("player", "yellow", 50, 80, 0, 9/2, 16/2, 3);
  }
  main() {
    // test the timer class
    this.timer.update();
    // update container reference for player if original reference has changed
    if(this.container !== this.player.container) {
      this.player.container = this.container;
    }
    // update player object
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
  // container
  container: any;
  // component attributes
  element: any;
  instanceID: string;
  color: string;
  transform: Transform;
  size: Size;
  // component variables
  intervals: IntervalInfo[] = [];
  // player variables
  speed: number;
  // flags
  exists: boolean;
  constructor(id: string, clr: string, x: number, y: number, r: number, w: number, h: number, s: number) {
    // initialize player element
    this.instanceID = id
    this.color = clr;
    this.transform = {
      position: {
        x: x,
        y: y,
      },
      rotation: r,
    }
    this.size = {
      width: w,
      height: h,
    }
    this.speed = s;
    this.exists = false;
  }
  update() {
    // only use container if it isn't undefined or null'
    if(this.container) {
      // only add player element to DOM once
      if(!this.exists) {
        this.exists = true;
        // initialize the player object
        // this.container.vcr._lContainer[0][0] is a reference to the dom element
        // offsetHeight and offsetWidth are the container's dimensions
        let context = this.container.vcr._lContainer[0][0];
        // proportionally set transform and size
        this.setTransform(
          context,
          this.toPixels(this.transform.position.x - this.size.width/2, context.offsetWidth),
          this.toPixels(this.transform.position.y - this.size.height/2, context.offsetHeight)
        );
        this.setSize(
          context,
          this.toPixels(this.size.width, context.offsetWidth),
          this.toPixels(this.size.height, context.offsetHeight)
        );
        // create the element instance
        this.element = this.container.addElement(this.instanceID, this.color, this.transform, this.size);
        // set instance speed
        this.element.setInput("speed", this.speed);
        // send object scripts to the instance
        this.element.setInput("keydownScript", this.keydownScript);
        this.element.setInput("keyupScript", this.keyupScript);
        this.element.setInput("clickScript", this.clickScript);
        this.element.setInput("mousemoveScript", this.mousemoveScript)
      }
    }
  }
  // event scripts
  // update event script
  updateScript() {

  }
  // keydown event script
  keydownScript(event: KeyboardEvent) {
    // 'this' refers to the ObjectGameComponent instance not this class
    // get useful event properties
    let key = event.key;
    let target = event.target as HTMLAreaElement;
    // define local method with lambda function
    let toPercent = (value: number, context: number) => {
      return (value / context ) * 100;
    };
    // condition which fixes speed imbalance in mobile vertical display mode
    let ratio = 0;
    if(target.offsetWidth > target.offsetHeight) {
      ratio = 1;
    }
    else {
      ratio = target.offsetHeight/target.offsetWidth;
    }

    // interval information variable
    let intervalInfo: IntervalInfo = { id: 0, token: key, };
    switch(key) {
      case 'q': // counterclockwise
        intervalInfo.id = window.setInterval(() => {this.transform.rotation -= 1;});
        break;
      case 'e': // clockwise
        intervalInfo.id = window.setInterval(() => {this.transform.rotation += 1;});
        break;
      case 'a': // left
        intervalInfo.id = window.setInterval(() => {
          if(this.transform.position.x < 1 + this.size.width) {
            window.clearInterval(intervalInfo.id);
          }
          else {
            this.transform.position.x -= toPercent(this.speed, target.offsetWidth*ratio);
          }
        }, 16);
        break;
      case 'd': // right
        intervalInfo.id = window.setInterval(() => {
          if(this.transform.position.x > 99 - this.size.width*2) {
            window.clearInterval(intervalInfo.id);
          }
          else {
            this.transform.position.x += toPercent(this.speed, target.offsetWidth*ratio);
          }
        }, 16);
        break;
      case 'w': // up
        intervalInfo.id = window.setInterval(() => {
          if(this.transform.position.y < 1 + this.size.height) {
            window.clearInterval(intervalInfo.id);
          }
          else {
            this.transform.position.y -= toPercent(this.speed, target.offsetHeight/ratio);
          }
        }, 16);
        break;
      case 's': // down
        intervalInfo.id = window.setInterval(() => {
          if(this.transform.position.y > 99 - this.size.height*2) {
            window.clearInterval(intervalInfo.id);
          }
          else {
            this.transform.position.y += toPercent(this.speed, target.offsetHeight/ratio);
          }
        }, 16);
        break;
    }
    return intervalInfo;
  }
  // keyup event script
  keyupScript(event: KeyboardEvent) {
    for(const info of this.intervals) {
      if(info.token == event.key) {
        window.clearInterval(info.id);
        this.intervals = this.intervals.filter((val) => {return val !== info});
      }
    }
  }
  // mousemove event script
  mousemoveScript(event: MouseEvent) {

  }
  // click event script
  clickScript(event: MouseEvent) {
    // example of moving object to click location
    // let target = event.target as HTMLAreaElement;
    // if(target) {
    //   if(target.className === "container-game")
    //   {
    //     // converts px to percent + sets relative position equal to the clicked location
    //     // also makes origin the center of the object
    //     this.transform.position.x = ((event.layerX / target.offsetWidth) * 100) - (this.size.width / 2);
    //     this.transform.position.y = ((event.layerY / target.offsetHeight) * 100) - (this.size.height / 2);
    //   }
    // }
  }
  // setters for transform and size, uses toPercent
  setTransform(context: any, x?: number, y?: number, r?: number) {
    if(x) this.transform.position.x = this.toPercent(x, context.offsetWidth);
    if(y) this.transform.position.y = this.toPercent(y, context.offsetHeight);
    if(r) this.transform.rotation = r;
  }
  setSize(context: any, w?: number, h?: number) {
    if(w) this.size.width = this.toPercent(w, context.offsetWidth);
    if(h) this.size.height = this.toPercent(h, context.offsetHeight)
  }
  // utility for calculating percentages
  toPercent(value: number, context: number) {
    let percent = (value / context) * 100; // calculate the percent from the pixels
    return percent;
  }
  // utility for converting percent to px
  toPixels(value: number, context: number) {
    let pixels = (value * context) / 100;
    return pixels;
  }
}
// custom data types for positioning and sizing
type Position = {
  x: number;
  y: number;
}
type Transform = {
  position: Position;
  rotation: number;
}
type Size = {
  width: number;
  height: number;
}
type IntervalInfo = {
  id: number;
  token: string;
}
