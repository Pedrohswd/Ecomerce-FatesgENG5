import { Component, OnInit } from '@angular/core';
import { Carrinho } from 'app/models/carrinho';
import { CarrinhoItem } from 'app/models/carrinhoItem';
import { UserService } from 'app/modules/user.service';

@Component({
    selector: 'app-compact',
    templateUrl: './compact.component.html',
})
export class CompactComponent implements OnInit {
    carrinho: CarrinhoItem[] = [];

    constructor(private _userService: UserService) {}
    
    ngOnInit(): void {
        this.carrinho = this._userService.getCarrinho();
    }

    removerItem(produtoId: number): void {
        this._userService.removeItem(produtoId);
        this.carrinho = this._userService.getCarrinho();
    }

    getTotal(): number {
        const total = this.carrinho.reduce(
            (acc, item) => acc + item.produto.price * item.quantidade,
            0
        );
        return parseFloat(total.toFixed(2));
    }
}
