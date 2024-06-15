import { FormGroup } from "@angular/forms";


export class Usuario {
    id?: any;
    email: string;
    senha: string;
    cpf: string;
    perfil: any;
    
    
    constructor(usuario: FormGroup, pessoa: FormGroup){
        this.id = usuario.value.id;
        this.email = usuario.value.email;
        this.senha = usuario.value.senha;
        this.cpf = pessoa.value.cpf;
        this.perfil = usuario.value.perfil;
    }
}