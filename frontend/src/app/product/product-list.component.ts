import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[];

    constructor(private productService: ProductService,
                private router: Router) {}
    
    ngOnInit() {
        this.productService.getAll().subscribe(products => this.products = products);
        // this.productService.getProducts().then(products => this.products = products);
    }

    gotoDetail(product: Product): void {
        this.router.navigate(['/detail', product.id]);
    }


}
