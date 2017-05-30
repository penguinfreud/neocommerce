/**
 * Created by 11206 on 2017/5/8.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cart } from './cart';
import { AccountService } from './account.service';
import {Order} from "./order";
import {showOrder} from "../util/fake-backend";

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
    cart: Cart;
    // products: Product[];
    total: number;

    constructor(
        // private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.cart = {shopOrders: []};
        this.accountService.getCart().then(res => this.cart = res);
        console.log("In balance component: cart is");
        showOrder(this.cart);
        this.total = this.calculateTotal();
        console.log("quit balance: cart is");
        showOrder(this.cart);
    }

    private calculateTotal():number {
        let sum: number = 0;
        for (let o of this.cart.shopOrders) {
            for (let order of o.orders) {
                sum += order.product.price;
            }
        }
        return sum;
    }

    selectAll():void {

    }

    delete(order: Order):void {
        this.accountService.removeOrder(order.id).then(() => {});
    }

    deleteSelected(): void {

    }
}