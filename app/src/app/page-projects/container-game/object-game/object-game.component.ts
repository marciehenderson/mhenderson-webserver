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
  @Input() script: Function;
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
    this.script = () => {};
    // start frequency controller for instance
    this.intervalID = window.setInterval(this.update, 16, this.instanceID); //16ms approximately 60fps
  }
  // event listeners
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // send event to script parameter
    this.script(event);
  }
  @HostListener('window:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    // example of moving object with mouse
    // let target = event.target as HTMLAreaElement;
    // if(target) {
    //   if(target.className === "container-game")
    //   {
    //     this.transform.position.x = event.layerX;
    //     this.transform.position.y = event.layerY;
    //   }
    // }
  }
  @HostListener('window:click', ['$event'])
  handleClick(event: MouseEvent) {
    // console.log(event);
    let target = event.target as HTMLAreaElement;
    if(target) {
      if(target.className === "container-game")
      {
        // converts px to percent + sets relative position equal to the clicked location
        this.transform.position.x = (event.layerX / target.offsetWidth) * 100;
        this.transform.position.y = (event.layerY / target.offsetHeight) * 100;
      }
    }
  }
  ngOnChanges() {
    // clear frequency controller and restart it if any substantial changes have occurred
    window.clearInterval(this.intervalID);
    this.intervalID = window.setInterval(this.update, 16, this.script); //16ms approximately 60fps
  }
  // methods
  update(script: Function) {
    // script();
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
