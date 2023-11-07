import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Paciente as PacienteModel } from './../models/paciente';
import { IdGeneratorService } from './id-generator.service';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private _pacienteEnEdicion = new BehaviorSubject<Paciente>(
    new PacienteModel()
  );
  private _pacientesSubject = new BehaviorSubject<Paciente[]>([]);
  pacientes$: Observable<Paciente[]>;
  pacienteEnEdicion$: Observable<Paciente>;
  constructor(private idGeneratorService: IdGeneratorService) {
    this.pacientes$ = this._pacientesSubject.asObservable();
    this.pacienteEnEdicion$ = this._pacienteEnEdicion.asObservable();
  }

  agregarPacienteRx(paciente: Paciente) {
    paciente.id = this.idGeneratorService.uuid();
    this.pacientes$
      .pipe(
        take(1),
        map((pacientes) => [...pacientes, paciente])
      )
      .subscribe((pacientes) => this._pacientesSubject.next(pacientes));
  }

  //Hacer versiones reactivas
  agregarPaciente(paciente: Paciente) {
    paciente.id = this.idGeneratorService.uuid();
    this._pacientesSubject.next([
      ...this._pacientesSubject.getValue(),
      paciente,
    ]);
  }

  editarPaciente(paciente: Paciente) {
    this._pacienteEnEdicion.next(paciente);
  }

  guardarCambiosPaciente(paciente: Paciente) {
    const pacientes = this._pacientesSubject.getValue().map((px) => {
      if (px.id === paciente.id) {
        return paciente;
      }
      return px;
    });
    this.editarPaciente(new PacienteModel());
    this._pacientesSubject.next([...pacientes]);
  }

  eliminarPaciente(pacienteAEliminar: Paciente) {
    const pacientesFiltrado = this._pacientesSubject
      .getValue()
      .filter((paciente) => paciente.id !== pacienteAEliminar.id);
    this._pacientesSubject.next(pacientesFiltrado);
    if (this._pacienteEnEdicion.getValue().id === pacienteAEliminar.id) {
      this._pacienteEnEdicion.next(new PacienteModel());
    }
  }
}
