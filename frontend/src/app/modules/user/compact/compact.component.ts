import { Component, OnInit } from '@angular/core';
import { Carrinho } from 'app/models/carrinho';
import { UserService } from 'app/modules/user.service';

@Component({
  selector: 'app-compact',
  templateUrl: './compact.component.html',
})
export class CompactComponent implements OnInit {
  carrinho: Carrinho

  constructor(private _userService: UserService) {

  }
    ngOnInit(): void {
        this._userService.findByIdCarrinho().subscribe((resposta)=> {
            this.carrinho = resposta
        })
    }


  getTotal(): number {
    return this.carrinho?.items.reduce((acc, item) => acc + (item.produto.price * item.quantidade), 0) || 0;
  }
}
