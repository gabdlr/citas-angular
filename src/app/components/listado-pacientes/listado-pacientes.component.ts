import { Component } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css'],
})
export class ListadoPacientesComponent {
  pacientes$ = this.pacientesService.pacientes$;
  constructor(private pacientesService: PacientesService) {}

  trackBy(index: number, paciente: Paciente) {
    return paciente.id;
  }
}
