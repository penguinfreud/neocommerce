import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Product } from './product';
import { ProductService } from './product.service';
import {AccountService} from "../balance/account.service";

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product;

    constructor(
        private productService: ProductService,
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router) {
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
        this.accountService.addProduct(this.product);
    }

    balance():void {
        this.router.navigate("");
    }
}
