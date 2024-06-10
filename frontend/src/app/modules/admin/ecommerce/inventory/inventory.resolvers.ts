import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { InventoryService } from './inventory.service';
import {
    InventoryProduct,
} from './inventory.types';
import { Product } from 'app/models/product';

@Injectable({
    providedIn: 'root',
})
@Injectable({
    providedIn: 'root',
})
@Injectable({
    providedIn: 'root',
})
export class InventoryProductResolver implements Resolve<Product> {
    /**
     * Constructor
     */
    constructor(
        private _inventoryService: InventoryService,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Product> {
        return this._inventoryService
            .getProductById(route.paramMap.get('id'))
            .pipe(
                // Error here means the requested product is not available
                catchError((error) => {
                    // Log the error
                    console.error(error);

                    // Get the parent url
                    const parentUrl = state.url
                        .split('/')
                        .slice(0, -1)
                        .join('/');

                    // Navigate to there
                    this._router.navigateByUrl(parentUrl);

                    // Throw an error
                    return throwError(error);
                })
            );
    }
}

@Injectable({
    providedIn: 'root',
})
export class InventoryProductsResolver implements Resolve<Product[]> {
    /**
     * Constructor
     */
    constructor(private _inventoryService: InventoryService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Product[]> {
        return this._inventoryService.getProducts();
    }
}
