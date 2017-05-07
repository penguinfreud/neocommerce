import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { Product } from './product';

@Injectable()
export class ProductService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/products', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/products/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(product: Product) {
        return this.http.post('/api/products', product, this.jwt()).map((response: Response) => response.json());
    }

    update(product: Product) {
        return this.http.put('/api/products/' + product.id, product, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/products/' + id, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
