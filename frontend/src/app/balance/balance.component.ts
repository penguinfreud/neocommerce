/**
 * Created by 11206 on 2017/5/8.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../product/product';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class BalanceComponent implements OnInit {
    products: Product[];

    constructor( private router: Router) {}

    ngOnInit() {

    }

    gotoDetail(product: Product): void {
        this.router.navigate(['/detail', product.id]);
    }
}