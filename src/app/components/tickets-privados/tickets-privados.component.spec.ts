import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPrivadosComponent } from './tickets-privados.component';

describe('TicketsPrivadosComponent', () => {
  let component: TicketsPrivadosComponent;
  let fixture: ComponentFixture<TicketsPrivadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsPrivadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsPrivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
