import 'rxjs/add/operator/switchMap';
import {Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';
import {AccountService} from "../balance/account.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user";

import '../../assets/js/product-detail';

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

    // TODO
    // test if addProduct can be called successfully
    addToCart():void {
        let currentUser = this.validateLogIn();
        // console.log(currentUser);
        if (!currentUser) {
            this.router.navigate(['login']);
        }
        let cart = this.accountService.addProduct(this.product, currentUser);
    }

    balance():void {
        if (!this.userService.getCurrent()) {
            this.router.navigate(["login"]);
        }
        this.router.navigate(["balance"]);
    }
     private handleError(error: any): Promise<any> {
        console.error('An error occurred in account service', error);
        return Promise.reject(error.message || error);
    }
    private validateLogIn(): User {
        let user = JSON.parse(localStorage.getItem('currentUser')) ;
        if (user && user.token) {
            return user;
        } else
            return null;
    }
}
