import { Component } from '@angular/core';
import { ObjectGameComponent } from './object-game/object-game.component';

@Component({
  selector: 'app-container-game',
  standalone: true,
  imports: [ObjectGameComponent,],
  templateUrl: './container-game.component.html',
  styleUrl: './container-game.component.scss'
})
export class ContainerGameComponent {
  constructor() {
    // constrains regular events to approximately 60fps
    // window.setInterval(this.update, 16); // 16ms
  }
  // runs at a set frequency
  update() {
    console.log("hello")
  }
}
