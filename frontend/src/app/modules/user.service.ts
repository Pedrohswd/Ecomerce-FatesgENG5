import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'app/core/config/API_CONFIG';
import { Carrinho } from 'app/models/carrinho';
import { Product } from 'app/models/product';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _products: BehaviorSubject<Product[]> = new BehaviorSubject<
        Product[]
    >(null);
    private _carrinho: BehaviorSubject<Carrinho[]> = new BehaviorSubject<
    Carrinho[]
    >(null);

    constructor(private _httpClient: HttpClient) {}

    get products$(): Observable<Product[]> {
        return this._products.asObservable();
    }
    get carrinho$(): Observable<Carrinho[]> {
        return this._carrinho.asObservable();
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

    findAllCarrinhos() {
        return this._httpClient
        .get<Carrinho[]>(`${API_CONFIG.baseUrl}/api/carrinho/`)
        .pipe(
            tap((carrinho: Carrinho[]) => {
                this._carrinho.next(carrinho);
            })
        );
    }

    findByIdCarrinho(): Observable<Carrinho>{
        return this._httpClient.get<Carrinho>(`${API_CONFIG.baseUrl}/api/carrinho/1`)
    }

    getCarrinhoById(eventId: any): Observable<any> {
        return this._carrinho.pipe(
            map((events: any[]) =>
                events.find((event) => event.id === +eventId)
            )
        );
    }
}
