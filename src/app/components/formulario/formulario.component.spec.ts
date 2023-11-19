import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/paciente';
import { BehaviorSubject } from 'rxjs';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let pacienteServiceMock: jasmine.SpyObj<PacientesService>;
  let pacienteEnEdicionMock: BehaviorSubject<Paciente>;
  beforeEach(() => {
    pacienteServiceMock = jasmine.createSpyObj(PacientesService, [
      'agregarPaciente',
      'guardarCambiosPaciente',
      'editarPaciente',
    ]);
    pacienteEnEdicionMock = new BehaviorSubject(new Paciente());
    pacienteServiceMock.pacienteEnEdicion$ =
      pacienteEnEdicionMock.asObservable();
    TestBed.configureTestingModule({
      declarations: [FormularioComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: PacientesService, useValue: pacienteServiceMock }],
    });
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset and set form on edit', async () => {
    const resetFormSpy = spyOn(component.form!, 'resetForm');
    const setValueSpy = spyOn(component.form!, 'setValue');
    const newPatient = new Paciente();
    component.ngAfterViewInit();
    fixture.detectChanges();
    await fixture.whenStable();
    pacienteEnEdicionMock.next(newPatient);
    expect(resetFormSpy).toHaveBeenCalled();
    expect(setValueSpy).toHaveBeenCalledWith(newPatient);
  });

  it('should edit patient if submitted patient has id', async () => {
    const resetFormSpy = spyOn(component.form!, 'resetForm');
    await fixture.whenStable();
    component.form?.setValue(
      new Paciente(
        'mock@mockmail.com',
        '2023-11-19',
        'mockId',
        'mockName',
        'mockOwner',
        'mockSymptoms'
      )
    );
    component.submit(component.form!);
    expect(resetFormSpy).toHaveBeenCalled();
    expect(pacienteServiceMock.guardarCambiosPaciente).toHaveBeenCalled();
  });

  it("should create new patient if submitted patient doesn't have an id", async () => {
    const resetFormSpy = spyOn(component.form!, 'resetForm');
    await fixture.whenStable();
    component.form?.setValue(
      new Paciente(
        'mock@mockmail.com',
        '2023-11-19',
        undefined,
        'mockName',
        'mockOwner',
        'mockSymptoms'
      )
    );
    component.submit(component.form!);
    expect(resetFormSpy).toHaveBeenCalled();
    expect(pacienteServiceMock.agregarPaciente).toHaveBeenCalled();
  });
});
