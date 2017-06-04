/**
 * Created by 11206 on 2017/5/8.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Cart, ShopOrder} from './cart';
import { AccountService } from './account.service';
import {Order} from "./order";

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
        this.accountService.getCart().then(res => {
            this.cart = res;
            this.total = this.calculateTotal();
        });
    }

    private calculateTotal():number {
        let sum: number = 0;
        for (let o of this.cart.shopOrders) {
            for (let order of o.orders) {
                if (order.selected) {
                    sum += order.product.price;
                }
            }
        }
        return sum;
    }

    shopSelected(shop: ShopOrder): boolean {
        let filt = shop.orders.filter(sh => !sh.selected);
        return filt.length == 0;
    }

    selectAll():void { }

    delete(order: Order):void {
        this.accountService.removeOrder(order.id).then(() => {});
    }

    deleteSelected(): void {

    }
}