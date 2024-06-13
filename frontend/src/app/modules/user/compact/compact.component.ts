import { Component, OnInit } from '@angular/core';
import { Carrinho } from 'app/models/carrinho';
import { CarrinhoItem } from 'app/models/carrinhoItem';
import { UserService } from 'app/modules/user.service';

@Component({
    selector: 'app-compact',
    templateUrl: './compact.component.html',
})
export class CompactComponent implements OnInit {
    carrinho: Carrinho;

    constructor(private _userService: UserService) {}

    ngOnInit(): void {
        this._userService.obterOuCriarCarrinho().subscribe(
            (data) => {
                this.carrinho = data;
            },
            (error) => {
                console.error('Erro ao obter ou criar carrinho', error);
            }
        );
    }

    removerItem(produtoId: number): void {
        this._userService.removerProduto(produtoId);
        this._userService.obterOuCriarCarrinho().subscribe(
            (data) => {
                this.carrinho = data;
            },
            (error) => {
                console.error('Erro ao obter ou criar carrinho', error);
            }
        );
    }


    getTotal(): number {
        if (!this.carrinho || !this.carrinho.items) {
            return 0;
        }

        const total = this.carrinho.items.reduce(
            (acc, item) => acc + item.produto.price * item.quantidade,
            0
        );
        return parseFloat(total.toFixed(2));
    }
}
