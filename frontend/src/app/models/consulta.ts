import { FormGroup } from '@angular/forms';
import { Unidade } from './unidade';

export class Consulta {
    id?: any;
    unidade: Unidade;
    especialidade: string;
    horario: string;
    diasDaSemana: string[];
    medico: string;
    status: any;

    constructor(consultaForm: FormGroup) {
        this.id = consultaForm.value.id;
        this.unidade = consultaForm.value.unidade;
        this.especialidade = consultaForm.value.especialidade;
        this.horario = this.formatarHorario(consultaForm.value.horario);
        this.medico = consultaForm.value.medico;
        this.status = consultaForm.value.status;
        this.diasDaSemana = consultaForm.value.diasSelecionados;
    }

    formatarHorario(horario: string): string {
        if (horario && horario.length === 5 && horario[2] === ':') {
            return horario;
        } else {
            return horario.slice(0, 2) + ':' + horario.slice(2);
        }
    }
}
