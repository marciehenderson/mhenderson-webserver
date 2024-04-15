import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectGameComponent } from './object-game.component';

describe('ObjectGameComponent', () => {
  let component: ObjectGameComponent;
  let fixture: ComponentFixture<ObjectGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjectGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
