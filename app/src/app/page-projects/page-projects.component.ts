import { Component } from '@angular/core';
import { ContainerGameComponent } from './container-game/container-game.component';

@Component({
  selector: 'app-page-projects',
  standalone: true,
  imports: [ ContainerGameComponent, ],
  templateUrl: './page-projects.component.html',
  styleUrl: './page-projects.component.scss'
})
export class PageProjectsComponent {

}
