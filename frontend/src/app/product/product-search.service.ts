/**
 * Created by 11206 on 2017/5/29.
 */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product } from './product';

let reqOpt = new RequestOptions({ headers: new Headers({ 'Accept': 'application/json' }) });

@Injectable()
export class ProductSearchService {
    constructor (private http: Http) {}
    search(term: string): Observable<Product[]> {
        return this.http.get(`app/heroes/?name=${term}`, reqOpt)
            .map(response => response.json().data as Product[]);
    }
}