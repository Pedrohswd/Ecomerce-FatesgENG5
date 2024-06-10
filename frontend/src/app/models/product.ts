import { FormGroup } from '@angular/forms';

export class Product {
    id?: any;
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoria: string;
    status: boolean;
    image?: File;

    constructor(productForm: FormGroup) {
        this.id = productForm.value.id;
        this.name = productForm.value.name;
        this.description = productForm.value.description;
        this.price = productForm.value.price;
        this.quantity = productForm.value.quantity;
        this.categoria = productForm.value.categoria;
        this.status = productForm.value.status;
        this.image = productForm.value.image;
    }
}