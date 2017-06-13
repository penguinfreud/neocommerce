import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Product } from '../product/product';
import { Cart } from './cart';
import {User} from '../user/user';
import {UserService} from "../user/user.service";
import {Order} from "./order";

@Injectable()
export class AccountService {
    // products: Product[] = [];
    private cartUrl: string = "/api/cart";

    constructor(private http: Http, private userServ: UserService) { }

    /*
    * TODO: now i can't add a product to the cart
    *       through a product object or id
    * */
    // post api/cart
    addProduct(product: Product, currentUser: User): Promise<Cart>{
        return this.http.post(this.cartUrl, {product: product, id: currentUser.id, token: currentUser.token}, this.jwt())
            .toPromise()
            .then(res => res.json().data as Cart)
            .catch(this.handleError);
    }

    // delete api/cart/order_id
    removeOrder(id: number): Promise<void> {
        const url = `${this.cartUrl}/${id}`;
        return this.http.delete(url, this.jwt())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    // get api/cart/usr_id
    getCart(): Promise<Cart> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser')) ;
        // this.userServ.getCurrent().toPromise().then(res => currentUser = res).catch(this.handleError);
        return this.http.get(`${this.cartUrl}/${currentUser.id}`, this.jwt())
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred in account service', error);
        return Promise.reject(error.message || error);
    }

    private jwt(hasContent?: boolean) {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            if (hasContent) {
                headers.append('Content-Type', 'application/json');
            }
            return new RequestOptions({ headers: headers });
        }
    }
}