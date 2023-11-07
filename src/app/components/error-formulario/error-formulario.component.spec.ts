import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFormularioComponent } from './error-formulario.component';

describe('ErrorFormularioComponent', () => {
  let component: ErrorFormularioComponent;
  let fixture: ComponentFixture<ErrorFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorFormularioComponent]
    });
    fixture = TestBed.createComponent(ErrorFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
