import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { ObjectGameComponent } from './object-game/object-game.component';

@Component({
  selector: 'app-container-game',
  standalone: true,
  imports: [ObjectGameComponent,],
  templateUrl: './container-game.component.html',
  styleUrl: './container-game.component.scss',
})
export class ContainerGameComponent{
  // properties
  @Input() script: Function;
  intervalID: number;
  constructor(private vcr: ViewContainerRef) {
    // initializes default main script
    this.script = () => {};
    // constrains regular events to approximately 60fps
    this.intervalID = window.setInterval(this.update, 16, this.script); // 16ms
  }
  // gets container div for loading game objects into
  @ViewChild('containergame', {read: ViewContainerRef}) child!: ViewContainerRef;
  // handles changes to properties
  ngOnChanges() {
    window.clearInterval(this.intervalID);
    this.intervalID = window.setInterval(this.update, 16, this.script);
  }
  // runs at a set frequency
  update(script: Function) {
    script();
  }
  // add element to DOM
  addElement(id: string, color: string, transform: Object, size: Object) {
    let element = this.child.createComponent(ObjectGameComponent);
    element.setInput("instanceID", id);
    element.setInput("color", color);
    element.setInput("transform", transform); // new Object({position:{x: 0, y: 0}, rotation: 0})
    element.setInput("size", size); // new Object({width: 0, height: 0})
  }
}
