import 'rxjs/add/operator/switchMap';
import {Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';
import {AccountService} from "../balance/account.service";
import {UserService} from "../user/user.service";

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    product: Product;

    constructor(
        private productService: ProductService,
        private userService: UserService,
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,) {
    }

    ngOnInit():void {
        // this.route.params
        //     .switchMap((params: Params) => this.productService.getById(parseInt(params['id'])))
        //     .subscribe(product => this.product = product);
        this.route.params
            .switchMap((params: Params) => this.productService.getById(+params['id']))
            .subscribe(product => this.product = product);
    }

    ngOnDestroy():void {
        onUnload();
    }
    
    addToCart():void {
        if (!this.userService.getCurrent()) {
            this.router.navigate(["login"]);
        }
        console.log("Add product:");
        console.log(this.product);
        this.accountService.addProduct(this.product);
    }

    balance():void {
        if (!this.userService.getCurrent()) {
            this.router.navigate(["login"]);
        }
        this.router.navigate(["balance"]);
    }
}
