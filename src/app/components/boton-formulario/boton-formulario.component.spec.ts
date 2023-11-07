import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonFormularioComponent } from './boton-formulario.component';

describe('BotonFormularioComponent', () => {
  let component: BotonFormularioComponent;
  let fixture: ComponentFixture<BotonFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotonFormularioComponent]
    });
    fixture = TestBed.createComponent(BotonFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
