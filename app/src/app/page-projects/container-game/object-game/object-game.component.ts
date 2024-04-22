import { Component } from '@angular/core';

@Component({
  selector: 'app-object-game',
  standalone: true,
  imports: [],
  templateUrl: './object-game.component.html',
  styleUrl: './object-game.component.scss'
})
export class ObjectGameComponent {
  // properties
  color: string;
  transform: Transform;
  size: Size;
  isActing: boolean;
  constructor() {
    // set defaults
    this.isActing = false;
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
  }
  // methods
  objectController(delay: number) {
    // do regular object stuff
    if(!this.isActing)
    {
      window.setTimeout(() => {
        if(this.color !== "blue"){
          this.color = "blue";
        }
        else{
          this.color = "red";
        }
      }, delay);
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
