/**
 * Created by 11206 on 2017/5/8.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../product/product';
import { AccountService } from './account.service';

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
    products: Product[];
    total: number;

    constructor(
        // private router: Router,
        private acountService: AccountService
    ) {}

    ngOnInit() {
        this.acountService.getCart().then(res => this.products = res);
        this.total = this.acountService.total;
        console.log(this.products);
    }

    private calculateTotal():number {
        let sum: number;
        for (let product in this.products) {
            sum += product.price;
        }
    }

}