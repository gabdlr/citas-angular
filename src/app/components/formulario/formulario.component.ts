import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Paciente } from '../../models/paciente';
import { PacientesService } from '../../services/pacientes.service';
import { of, skip } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements AfterViewInit {
  @ViewChild('form') form?: NgForm;
  pacienteEnEdicion$ = of(new Paciente());

  constructor(private pacientesService: PacientesService) {
    this.pacienteEnEdicion$ = this.pacientesService.pacienteEnEdicion$;
  }

  ngAfterViewInit() {
    this.pacienteEnEdicion$.pipe(skip(1)).subscribe((paciente) => {
      if (this.form) {
        this.form.resetForm();
        this.form?.setValue(paciente);
      }
    });
  }

  submit(form: NgForm) {
    const paciente = form.value;
    if (form.valid) {
      if (this.form?.value.id === '') {
        this.pacientesService.agregarPaciente({ ...paciente });
      } else {
        this.pacientesService.guardarCambiosPaciente({ ...paciente });
      }
      form.resetForm({ id: '' });
    }
  }
}
