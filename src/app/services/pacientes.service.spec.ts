import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { PacientesService } from './pacientes.service';
import { Paciente } from '../models/paciente';

describe('PacientesService', () => {
  let service: PacientesService;
  let mockPatient: Paciente;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacientesService);
    mockPatient = new Paciente(
      'mock@mockmail.com',
      '2023-14-11',
      undefined,
      'Mock name',
      'Mock owner',
      'Mock symptoms'
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new patient', () => {
    const patientsObservable = service.pacientes$;
    service.agregarPaciente(mockPatient);
    patientsObservable.subscribe((pacients) => {
      expect(pacients.length).toBe(1);
    });
  });

  it('should add a new patient', () => {
    service.agregarPacienteRx(mockPatient);
    service.pacientes$.subscribe((patients) => {
      expect(patients.length).toBe(1);
    });
  });

  it('should edit patient', () => {
    service.editarPaciente(mockPatient);
    service.pacienteEnEdicion$.subscribe((patient) => {
      expect(patient).toBe(mockPatient);
    });
  });

  it('should not modify other patients when modifying a patient', () => {
    const trace = 'Mock name modified';
    const patientOne = service.agregarPaciente(mockPatient);
    const patientTwo = service.agregarPaciente(mockPatient);
    patientOne.nombre = trace;
    service.guardarCambiosPaciente(patientOne);
    service.pacientes$.subscribe((patients) => {
      const patientTwoInSubject = patients.filter(
        (px) => px.id === patientTwo.id
      )[0];
      expect(patientTwoInSubject).toEqual(patientTwo);
    });
  });

  it('should persist patient changes', () => {
    const trace = 'Mock name modified';
    const newPatient = service.agregarPaciente(mockPatient);
    newPatient.nombre = trace;
    service.guardarCambiosPaciente(newPatient);
    service.pacientes$.subscribe((patients) => {
      expect(patients[0].nombre).toBe(trace);
    });
  });

  it('should delete a patient', () => {
    const addedPatient = service.agregarPaciente(mockPatient);
    service.eliminarPaciente(addedPatient);
    service.pacientes$.subscribe((patients) => expect(patients.length).toBe(0));
  });

  it('should remove patient from on edition if it is deleted', () => {
    const addedPatient = service.agregarPaciente(mockPatient);
    service.editarPaciente(addedPatient);
    service.eliminarPaciente(addedPatient);
    service.pacienteEnEdicion$.subscribe((patientOnEdit) =>
      expect(addedPatient.id).not.toBe(patientOnEdit.id)
    );
  });
});
