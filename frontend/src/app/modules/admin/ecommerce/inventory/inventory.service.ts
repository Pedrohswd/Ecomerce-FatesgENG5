import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from './inventory.types';
import { API_CONFIG } from 'app/core/config/API_CONFIG';
import { Product } from 'app/models/product';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    // Private
    private _product: BehaviorSubject<Product | null> = new BehaviorSubject(null);
    private _products: BehaviorSubject<Product[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for product
     */
    get product$(): Observable<Product> {
        return this._product.asObservable();
    }

    /**
     * Getter for products
     */
    get products$(): Observable<Product[]> {
        return this._products.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Get products
     */
    getProducts(): Observable<Product[]> {
        return this._httpClient.get<Product[]>(`${API_CONFIG.baseUrl}/api/product/`).pipe(
            tap((products) => {
                this._products.next(products);
            })
        );
    }


    /**
     * Get product by id
     */
    getProductById(id: string): Observable<Product> {
        return this._products.pipe(
            take(1),
            map((products) => {
                // Find the product
                const product = products.find(item => item.id === id) || null;

                // Update the product
                this._product.next(product);

                // Return the product
                return product;
            }),
            switchMap((product) => {
                if (!product) {
                    return throwError('Could not found product with id of ' + id + '!');
                }
                return of(product);
            })
        );
    }

    /**
     * Create product
     */
    createProduct(): Observable<Product> {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<Product>(`${API_CONFIG.baseUrl}/api/product/`, {}).pipe(
                map((newProduct) => {
                    // Update the products with the new product
                    this._products.next([newProduct, ...products]);
                    // Return the new product
                    return newProduct;
                })
            ))
        );
    }

    /**
     * Update product
     *
     * @param id
     * @param product
     */
    updateProduct(id: string, product: Product): Observable<Product> {
        console.log(product)
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.put<Product>(`${API_CONFIG.baseUrl}/api/product/`, product)
            .pipe(
                map((updatedProduct) => {
                    // Find the index of the updated product
                    const index = products.findIndex(item => item.id === id);
                    // Update the product
                    products[index] = updatedProduct;
                    // Update the products
                    this._products.next(products);
                    // Return the updated product
                    return updatedProduct;
                }),
                switchMap(updatedProduct => this.product$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {
                        // Update the product if it's selected
                        this._product.next(updatedProduct);
                        // Return the updated product
                        return updatedProduct;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the product
     *
     * @param id
     */
    deleteProduct(id: string): Observable<boolean> {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.delete(`${API_CONFIG.baseUrl}/api/product/${id}`, { params: { id } }).pipe(
                map((isDeleted: boolean) => {
                    // Find the index of the deleted product
                    const index = products.findIndex(item => item.id === id);
                    // Delete the product
                    products.splice(index, 1);
                    // Update the products
                    this._products.next(products);
                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }
}