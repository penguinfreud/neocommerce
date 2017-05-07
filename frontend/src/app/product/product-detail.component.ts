import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


import { Product } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute) {
    }

    ngOnInit():void {
        // this.route.params
        //     .switchMap((params: Params) => this.productService.getById(parseInt(params['id'])))
        //     .subscribe(product => this.product = product);
        this.route.params
            .switchMap((params: Params) => this.productService.getProduct(+params['id']))
            .subscribe(product => this.product = product);
    }
    
    addToCart():void {

    }

    balance():void {

    }
}
