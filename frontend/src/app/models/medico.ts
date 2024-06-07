import { FormGroup } from "@angular/forms";

export class Medico {
    id?: any;
    nome: string;
    crm: string;
    dataNascimento: string;

    constructor(medicoForm: FormGroup){
        this.id = medicoForm.value.id;
        this.nome = medicoForm.value.nome;
        this.crm = medicoForm.value.crm;
        this.dataNascimento = medicoForm.value.dataNascimento;
    }
}