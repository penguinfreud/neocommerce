import 'rxjs/add/operator/switchMap';
import {Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';
import {AccountService} from "../checkout/account.service";
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
    colors: string[] = [
        "red",
        "yellow",
        "blue",
        "black"
    ];

    constructor(
        private productService: ProductService,
        private userService: UserService,
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,) {
    }

    ngOnInit():void {
        this.route.params
            .switchMap((params: Params) => this.productService.getById(+params['id']))
            .subscribe(product => this.product = product);
    }

    ngOnDestroy():void {
        onUnload();
    }

    onDeskChange(color: any) {
        // console.log(color);
        switchDeskColor(color);
    }

    onChairChange(color: any) {
        // console.log(color);
        switchChairColor(color);
    }

    addToCart():void {
        let currentUser = this.validateLogIn();
        if (!currentUser) {
            this.router.navigate(['login']);
        } else {
            let cart = this.accountService.addProduct(this.product, currentUser);
        }
    }

    checkout():void {
        if (!this.userService.getCurrent()) {
            this.router.navigate(["login"]);
        }
        this.router.navigate(["checkout"]);
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
