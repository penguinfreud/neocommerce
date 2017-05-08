import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { Product } from '../product/product';
import { ProductService } from '../product/product.service';

@Injectable()
export class AccountService {
    products: Product[] = [];
    total: number = 0;
    constructor(private http: Http, private productService: ProductService) { }

    addProduct(id: number): Promise<void>{
        let iD = id.valueOf();
        let product: Product;
        this.productService.getProduct(iD).then(p => product = p);
        if (product) {
            this.products.push(product);
            this.total += product.price;
        }
        console.log("id" + id);
        console.log(iD);
        console.log(this.total);
        console.log(product);
        return Promise.resolve(undefined);
    }

    removeProduct(product: Product): void {
        let index = this.products.indexOf(product, 0);
        if (index > -1) {
            // delete this item
            this.products.slice(index, 1);
        }
        console.log(this.total);
    }

    getCart( ): Product[] {
        return this.products;
    }
}