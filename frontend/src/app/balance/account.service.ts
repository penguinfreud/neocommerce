import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { Product } from '../product/product';
import {User} from '../user/user';
import { ProductService } from '../product/product.service';
import {UserService} from "../user/user.service";

@Injectable()
export class AccountService {
    // products: Product[] = [];
    private cartUrl: string = "api/cart";
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private userServ: UserService) { }

    /*
    * TODO: now i can't add a product to the cart
    *       through a product object or id
    * */
    // post api/cart
    addProduct(product: Product): Promise<Product>{
        let currentUser: User;
        this.userServ.getCurrent().toPromise().then(res => currentUser = res).catch(this.handleError);
        return this.http.post(this.cartUrl, JSON.stringify({product: product, token: currentUser.token}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Product)
            .catch(this.handleError);

        // let iD = id.valueOf();
        // let product: Product;
        // this.productService.getProduct(iD).then(p => product = p);
        // if (product) {
        //     this.products.push(product);
        //     this.total += product.price;
        // }
        // console.log("id" + id);
        // console.log(iD);
        // console.log(this.total);
        // console.log(product);
        // return Promise.resolve(undefined);
    }

    // delete api/cart/product_id
    removeProduct(id: number): Promise<void> {
        const url = `${this.cartUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);

        // let index = this.products.indexOf(product, 0);
        // if (index > -1) {
        //     // delete this item
        //     this.products.slice(index, 1);
        // }
        // console.log(this.total);
    }

    // get api/cart/usrToken
    getCart(): Promise<Product[]> {
        // return this.products;
        let currentUser: User;
        this.userServ.getCurrent().toPromise().then(res => currentUser = res).catch(this.handleError);
        return this.http.get(`${this.cartUrl}/${currentUser.token}`)
            .toPromise()
            .then(res => res.json().data as Product[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred in account service', error);
        return Promise.reject(error.message || error);
    }
}