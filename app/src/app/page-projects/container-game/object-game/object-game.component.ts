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
  constructor() {
    // set defaults
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
