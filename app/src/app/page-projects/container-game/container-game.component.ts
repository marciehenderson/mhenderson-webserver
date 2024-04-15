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

}
