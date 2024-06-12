import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'app/core/config/API_CONFIG';
import { Carrinho } from 'app/models/carrinho';
import { CarrinhoItem } from 'app/models/carrinhoItem';
import { Product } from 'app/models/product';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _products: BehaviorSubject<Product[]> = new BehaviorSubject<
        Product[]
    >(null);

    private storageKey = 'carrinho';

    constructor(private _httpClient: HttpClient) {}

    get products$(): Observable<Product[]> {
        return this._products.asObservable();
    }

    getCertificateById(eventId: any): Observable<any> {
        return this._products.pipe(
            map((events: any[]) =>
                events.find((event) => event.id === +eventId)
            )
        );
    }

    getAll(): Product[] {
        return this._products.value;
    }

    findAllProducts() {
        return this._httpClient
            .get<Product[]>(`${API_CONFIG.baseUrl}/api/product/`)
            .pipe(
                tap((product: Product[]) => {
                    this._products.next(product);
                })
            );
    }

    getCarrinho(): CarrinhoItem[] {
        const carrinho = localStorage.getItem(this.storageKey);
        return carrinho ? JSON.parse(carrinho) : [];
    }

    addItem(produto: Product, quantidade: number): void {
        const carrinho = this.getCarrinho();
        const itemExistente = carrinho.find(
            (item) => item.produto.id === produto.id
        );

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.push({ produto, quantidade });
        }

        localStorage.setItem(this.storageKey, JSON.stringify(carrinho));
    }

    removeItem(produtoId: number): void {
        let carrinho = this.getCarrinho();
        carrinho = carrinho.filter((item) => item.produto.id !== produtoId);
        localStorage.setItem(this.storageKey, JSON.stringify(carrinho));
    }

    clearCarrinho(): void {
        localStorage.removeItem(this.storageKey);
    }
}
