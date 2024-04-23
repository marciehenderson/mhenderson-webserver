import { Component, Input } from '@angular/core';

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
    // start frequency controller for instance
    this.intervalID = window.setInterval(this.update, 16, this.instanceID); //16ms approximately 60fps
  }
  ngOnChanges() {
    // clear frequency controller and restart it if any substantial changes have occurred
    window.clearInterval(this.intervalID);
    this.intervalID = window.setInterval(this.update, 16, this.instanceID); //16ms approximately 60fps
  }
  // methods
  update(instanceID: string) {
    // example of an object's routine
    let instance = document.getElementById(instanceID);
    if(instance) {
      let angle = instance.style.rotate;
      instance.style.rotate = (Number(angle.split("d")[0]) + 2) + "deg";
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
