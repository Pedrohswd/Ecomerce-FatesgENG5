import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrinho } from 'app/models/carrinho';
import { CarrinhoItem } from 'app/models/carrinhoItem';
import { Product } from 'app/models/product';
import { UserService } from 'app/modules/user.service';
import { Subscription } from 'rxjs';
import { fadeInRight } from '@fuse/animations/fade';

@Component({
    selector: 'app-compact',
    templateUrl: './compact.component.html',
})
export class CompactComponent implements OnInit {
    carrinho: Carrinho;

    constructor(private _userService: UserService, private route: ActivatedRoute) {}

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

    adicionarAoCarrinho(produto: Product, quantidade: number): void {
        this._userService.adicionarProduto(produto.id, quantidade);
        
        window.location.reload()
    }

    realizarPedido(){
        this._userService.gerarPedido()
        window.location.reload()
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
