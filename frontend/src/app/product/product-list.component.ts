import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {
    products: Product[]

    constructor(private productService: ProductService) {}
    
    ngOnInit() {
        this.productService.getAll().subscribe(products => this.products = products);
    }
}
