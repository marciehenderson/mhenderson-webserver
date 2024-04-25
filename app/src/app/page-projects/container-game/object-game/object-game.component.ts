import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-object-game',
  standalone: true,
  imports: [],
  templateUrl: './object-game.component.html',
  styleUrl: './object-game.component.scss',
})
export class ObjectGameComponent {
  // properties
  intervalID: number;
  @Input() instanceID: string;
  @Input() color: string;
  @Input() transform: Transform;
  @Input() size: Size;
  @Input() speed: number;
  // object event scripts
  @Input() updateScript: Function;
  @Input() keydownScript: Function;
  @Input() keyupScript: Function;
  @Input() mousemoveScript: Function;
  @Input() clickScript: Function;
  // variables
  intervals: IntervalInfo[] = [];
  constructor() {
    // set defaults
    this.instanceID = "defaultID";
    this.color = "black";
    this.transform = {
      position: {
        x: 10,
        y: 10,
      },
      rotation: 0,
    }
    this.size = {
      width: 10,
      height: 10,
    }
    this.speed = 1;
    // initialize event scripts
    this.updateScript = () => {};
    this.keydownScript = () => {};
    this.keyupScript = () => {};
    this.mousemoveScript = () => {};
    this.clickScript = () => {};
    // start frequency controller for instance
    this.intervalID = window.setInterval(this.update, 16, this.updateScript); //16ms approximately 60fps
  }
  // event listeners
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // send event to script parameter
    this.catchReturn(this.keydownScript(event));
  }
  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.keyupScript(event);
  }
  @HostListener('window:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    // mouse move script
    this.mousemoveScript(event);
  }
  @HostListener('window:click', ['$event'])
  handleClick(event: MouseEvent) {
    // click script
    this.clickScript(event);
  }
  ngOnChanges() {
    // clear frequency controller and restart it if any substantial changes have occurred
    window.clearInterval(this.intervalID);
    this.intervalID = window.setInterval(this.update, 16, this.updateScript); //16ms approximately 60fps
  }
  update(script: Function) {
    // update script();
    script();
  }
  // methods
  catchReturn(value: any) {
    // handle event return values by type
    switch(typeof value) {
      case 'object':
        // is the object an IntervalInfo type
        if(value.id && value.token) {
          // has this object been recorded yet?
          for(const info of this.intervals) {
            if(info.token == value.token) {
              if(info.id == value.id) {
                // don't append the value if it already has been
                break;
              }
              else {
                // 1 interval per token
                // clear the old interval
                window.clearInterval(info.id);
                // remove old interval from list
                this.intervals = this.intervals.filter((val) => {return val !== info});
              }
            }
          }
          // record the value in 'intervals'
          this.intervals.push(value);
        }
        break;
      default:
        break;
    }
  }
}
// custom data types
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
