import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
    FormControl,
    FormBuilder,
    FormGroup,
    ValidatorFn,
    AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { Pessoa } from 'app/models/pessoa';
import { Usuario } from 'app/models/usuario';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    isLinear = false;
    nome: boolean = false;
    pessoaForm: FormGroup;
    enderecoForm: FormGroup;
    usuarioForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _toast: ToastrService
    ) {
        this.pessoaForm = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, apenasLetrasESpacosValidator()]],
            cpf: [null, Validators.required],
            dataNascimento: [null, Validators.required],
        });
        this.enderecoForm = this._formBuilder.group({
            id: [null],
            rua: [null, Validators.required],
            numero: [null, Validators.required],
            complemento: [null],
            bairro: [null, Validators.required],
            cidade: [null, Validators.required],
            cep: [null, Validators.required],
        });
        this.usuarioForm = this._formBuilder.group({
            id: [null],
            email: [null, Validators.required],
            senha: [null, Validators.required],
            cpf: [null, Validators.required],
            perfil: [1],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    User;
    validaCampos(): boolean {
        const nomePessoaValido = this.pessoaForm.get('nome').valid;
        const cpfPessoaValido = this.pessoaForm.get('cpf').valid;
        const numeroPessoaValido = this.enderecoForm.get('numero').valid;
        const bairroPessoaValido = this.enderecoForm.get('bairro').valid;
        const cidadePessoaValido = this.enderecoForm.get('cidade').valid;
        const cepPessoaValido = this.enderecoForm.get('cep').valid;
        const emailPessoaValido = this.usuarioForm.get('email').valid;
        const senhaPessoaValido = this.usuarioForm.get('senha').valid;

        return (
            cpfPessoaValido &&
            numeroPessoaValido &&
            bairroPessoaValido &&
            nomePessoaValido &&
            cidadePessoaValido &&
            cepPessoaValido &&
            emailPessoaValido &&
            senhaPessoaValido
        );
    }

    signUp(): void {
        const pessoa = new Pessoa(this.pessoaForm, this.enderecoForm);
        const usuario = new Usuario(this.usuarioForm, this.pessoaForm);
        this._authService.signUp(pessoa).subscribe(
            (response) => {
                this._authService
                    .signUpUser(usuario)
                    .subscribe((response) => {});
                this._router.navigate(['sign-in']);
            },
            (ex) => {
                if (ex.error.errors) {
                    ex.error.errors.forEach((element) => {
                        this._toast.error(element.message);
                    });
                } else {
                    this._toast.error(ex.error.message);
                }
            }
        );
    }
}

export function apenasLetrasESpacosValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const valor = control.value;
        if (valor && !/^[a-zA-Z\s]*$/.test(valor)) {
            return { apenasLetrasESpacos: true };
        }
        return null;
    };
}
