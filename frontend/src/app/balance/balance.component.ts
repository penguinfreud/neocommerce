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
        this.products = this.acountService.getCart();
        this.total = this.acountService.total;
        console.log(this.products);
    }

}