import { Component, Injectable, AfterViewInit, ViewChild } from '@angular/core';
import { ContainerGameComponent } from './container-game/container-game.component';
import { ScriptGameComponent } from './script-game/script-game';

@Component({
  selector: 'app-page-projects',
  standalone: true,
  imports: [ ContainerGameComponent, ],
  templateUrl: './page-projects.component.html',
  styleUrl: './page-projects.component.scss',
  providers: [ ScriptGameComponent, ],
})
export class PageProjectsComponent implements AfterViewInit {
  script: Function;
  constructor(private service: ScriptGameComponent) {
    // sends imported main function to game container component
    this.script = () => {service.main()};
  }
  // get game container
  @ViewChild(ContainerGameComponent) container!: ContainerGameComponent;
  ngAfterViewInit() {
    // pass the container reference to the service script
    this.service.container = this.container;
  }
}
