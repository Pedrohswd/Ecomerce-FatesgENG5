import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Product } from 'app/models/product';
import { BehaviorSubject, Subject, combineLatest, takeUntil } from 'rxjs';
import { UserService } from 'app/modules/user.service';

@Component({
    selector: 'app-produto-list',
    templateUrl: './produto-list.component.html',
    styleUrls: ['./produto-list.component.scss'],
})
export class ProdutoListComponent {
    products: Product[];
    productsFiltradas: Product[];
    filteredProductCategoria = [];
    filters: {
        categorySlug$: BehaviorSubject<string>;
        unidadeSlug$: BehaviorSubject<string>;
    } = {
        categorySlug$: new BehaviorSubject('all'),
        unidadeSlug$: new BehaviorSubject('all'),
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _productService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.findAll();
        // Get the categories
        this._productService.products$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((products: Product[]) => {
                this.products = products;
                this.productsFiltradas = this.products;
                this.filterProduct();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // Filter the courses
        combineLatest([
            this.filters.categorySlug$,
            this.filters.unidadeSlug$,
        ]).subscribe(([categorySlug, unidadeSlug]) => {
            // Reset the filtered courses
            this.productsFiltradas = this.products;

            // Filter by category
            if (categorySlug !== 'all' && categorySlug !== undefined) {
                this.productsFiltradas = this.productsFiltradas.filter(
                    (product) => product.categoria === categorySlug
                );
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter by category
     *
     * @param change
     */
    filterByCategory(change: MatSelectChange): void {
        this.filters.categorySlug$.next(change.value.categoria);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    dias(dia: any) {
        switch (dia) {
            case 'MONDAY':
                return 'Segunda';
            case 'TUESDAY':
                return 'Terça';
            case 'WEDNESDAY':
                return 'Quarta';
            case 'THURSDAY':
                return 'Quinta';
            case 'FRIDAY':
                return 'Sexta';
            case 'SATURDAY':
                return 'Sábado';
        }
        return 'Dia inválido';
    }

    findAll() {
        this._productService.findAll().subscribe((resposta) => {});
    }

    especialidadeJaAdicionada(categoria: string): boolean {
        // Verifica se a especialidade já existe na lista filtrada
        return this.filteredProductCategoria.some(
            (product) => product.categoria === categoria
        );
    }

    filterProduct() {
        this.filteredProductCategoria = [];
        this.products.forEach((product) => {
            if (!this.especialidadeJaAdicionada(product.categoria)) {
                this.filteredProductCategoria.push(product);
            }
        });
    }
}
