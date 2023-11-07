import { Component, Input } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent {
  @Input() paciente: Paciente = new Paciente();
  constructor(private pacientesService: PacientesService) {}

  editarPaciente() {
    this.pacientesService.editarPaciente(this.paciente);
  }

  eliminarPaciente() {
    this.pacientesService.eliminarPaciente(this.paciente);
  }
}
