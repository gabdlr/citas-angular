import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteComponent } from './paciente.component';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/paciente';
import { By } from '@angular/platform-browser';
import { BotonFormularioComponent } from '../boton-formulario/boton-formulario.component';

describe('PacienteComponent', () => {
  let component: PacienteComponent;
  let fixture: ComponentFixture<PacienteComponent>;
  let pacientesServiceMock: jasmine.SpyObj<PacientesService>;
  let patientMock: Paciente;
  beforeEach(() => {
    pacientesServiceMock = jasmine.createSpyObj(PacientesService, [
      'editarPaciente',
      'eliminarPaciente',
    ]);
    TestBed.configureTestingModule({
      declarations: [PacienteComponent, BotonFormularioComponent],
      providers: [
        { provide: PacientesService, useValue: pacientesServiceMock },
      ],
    });
    fixture = TestBed.createComponent(PacienteComponent);
    patientMock = new Paciente();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call editarPacient on service when editarPaciente function is triggered', () => {
    component.paciente = patientMock;
    fixture.debugElement
      .query(By.css("[data-testId='pacientCardEditButton']"))
      .triggerEventHandler('click', {});

    expect(pacientesServiceMock.editarPaciente).toHaveBeenCalledOnceWith(
      patientMock
    );
  });

  it('should call eliminarPaciente on service when eliminarPaciente function is triggered', () => {
    component.paciente = patientMock;
    fixture.debugElement
      .query(By.css("[data-testId='pacientCardDeleteButton']"))
      .triggerEventHandler('click', {});
    expect(pacientesServiceMock.eliminarPaciente).toHaveBeenCalledOnceWith(
      patientMock
    );
  });
});
