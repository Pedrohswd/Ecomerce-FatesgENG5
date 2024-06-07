import { FormGroup } from "@angular/forms";
import { Endereco } from "./endereco";

export class Pessoa {
    id?: any;
    nome: string;
    cpf: string;
    dataNascimento: any;
    endereco: Endereco;

    constructor(pessoaForm: FormGroup, enderecoForm: FormGroup){
        this.id = pessoaForm.value.id;
        this.nome = pessoaForm.value.nome;
        this.cpf = pessoaForm.value.cpf;
        this.dataNascimento = pessoaForm.value.dataNascimento;
        this.endereco = new Endereco(enderecoForm);
    }
}
