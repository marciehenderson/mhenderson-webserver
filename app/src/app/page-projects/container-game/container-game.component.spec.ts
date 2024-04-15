import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerGameComponent } from './container-game.component';

describe('ContainerGameComponent', () => {
  let component: ContainerGameComponent;
  let fixture: ComponentFixture<ContainerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
