/**
 * Created by 11206 on 2017/5/8.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { Product } from '../product/product';

@Injectable()
export class AccountService {
    products: Product[];
    total: number;
    constructor(private http: Http) { }

    addProduct(product: Product):void {
        this.products.push(product);
        this.total += product.price;
    }

    removeProduct(product: Product): void {
        let index = this.products.indexOf(product, 0);
        if (index > -1) {
            // delete this item
            this.products.slice(index, 1);
        }
    }

    getCart( ): Product[] {
        return this.products;
    }
}