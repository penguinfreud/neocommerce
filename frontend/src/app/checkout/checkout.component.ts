/**
 * Created by 11206 on 2017/5/8.
 */
import { Component, OnInit } from '@angular/core';

import {Cart} from './cart';
import { AccountService } from './account.service';
import {Order} from "./order";

@Component({
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    cart: Cart;
    // products: Product[];
    shops: string[];
    selectedOrders: Order[];
    selectedShops: string[];
    total: number;
    update: boolean = false;

    constructor(
        // private router: Router,
        private accountService: AccountService
    ) {
        console.log(this);
    }

    private arrayRemove<T>(a: T[], e: T) {
        for (let i = a.length - 1; i>=0; i--) {
            if (a[i] === e) {
                a.splice(i, 1);
            }
        }
    }

    private addIfAbsent<T>(a: T[], e: T) {
        if (a.indexOf(e) === -1)
            a.push(e);
    }

    ngOnInit() {
        this.cart = {orders: []};

        this.refreshCart(true);
    }

    private refreshCart(setSelectedOrders: boolean = false) {
        this.accountService.getCart().then(res => {
            this.cart = res;
            this.shops = res.orders.map((order) => order.product.provider);
            if (setSelectedOrders) {
                this.selectedOrders = res.orders.slice();
                this.selectedShops = this.shops.slice();
            } else {
                this.selectedOrders = this.selectedOrders.filter((o) => res.orders.indexOf(o) >= 0);
                this.selectedShops = this.selectedOrders.map((o) => o.product.provider);
            }
            console.log(res);
            this.refreshTotal();
        });
    }

    private refreshTotal() {
        this.total = this.selectedOrders.map((order) => order.product.price).reduce((a, b) => a + b, 0);
    }

    isShopSelected(shop: string): boolean {
        return this.selectedShops.indexOf(shop) >= 0;
    }

    setShopSelected(shop: string, selected: boolean): void {
        if (selected) {
            this.addIfAbsent(this.selectedShops, shop);
            [].push.apply(this.selectedOrders, this.cart.orders.filter((order) => order.product.provider === shop));
        } else {
            this.arrayRemove(this.selectedShops, shop);
            this.selectedOrders = this.selectedOrders.filter((order) => order.product.provider !== shop);
        }
        this.refreshTotal();
    }

    selectAll(selected: boolean):void {
        if (selected) {
            this.selectedShops = this.shops.slice();
            this.selectedOrders = this.cart.orders.slice();
        } else {
            this.selectedShops = [];
            this.selectedOrders = [];
        }
        this.refreshTotal();
    }

    getOrdersOfShop(shop: string) {
        return this.cart.orders.filter(o => o.product.provider === shop);
    }

    isOrderSelected(order: Order) {
        return this.selectedOrders.indexOf(order) >= 0;
    }

    setOrderSelected(order: Order, selected: boolean) {
        if (selected) {
            this.addIfAbsent(this.selectedOrders, order);
            this.addIfAbsent(this.selectedShops, order.product.provider);
        } else {
            let shop = order.product.provider;
            this.arrayRemove(this.selectedOrders, order);
            if (this.selectedOrders.filter((o) => o.product.provider === shop).length === 0) {
                this.arrayRemove(this.selectedShops, shop);
            }
        }
        this.refreshTotal();
    }

    deleteOrder(order: Order):void {
        this.setOrderSelected(order, false);
        this.accountService.removeOrder(order.id);
        this.refreshCart();
    }

    deleteSelected(): void {
        for (let order of this.selectedOrders) {
            this.accountService.removeOrder(order.id);
        }
        this.refreshCart();
    }
}