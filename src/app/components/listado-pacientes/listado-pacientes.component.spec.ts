import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPacientesComponent } from './listado-pacientes.component';
import { Paciente } from '../../models/paciente';
import { FormsModule } from '@angular/forms';

describe('ListadoPacientesComponent', () => {
  let component: ListadoPacientesComponent;
  let fixture: ComponentFixture<ListadoPacientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoPacientesComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(ListadoPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return patientId to trackBy', () => {
    const mockPatient = new Paciente(
      'mock@mock.com',
      '2023-11-18',
      'mockId',
      'mockName',
      'mockOwner',
      'mockSymptoms'
    );
    const trackByReturnedId = component.trackBy(0, mockPatient);
    expect(trackByReturnedId).toBe(mockPatient.id);
  });
});
