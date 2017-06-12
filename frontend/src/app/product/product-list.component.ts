import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Product } from './product';
import { ProductService } from './product.service';
import { ProductSearchService } from "./product-search.service";

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductSearchService]
})
export class ProductListComponent implements OnInit {
    products: Observable<Product[]>;
    private searchTerms = new ReplaySubject<string>(1);

    constructor(private productService: ProductService,
                private productSearchService: ProductSearchService,
                private router: Router) {}
    
    ngOnInit():void {
        // this.products = this.searchTerms
        //     .debounceTime(300)
        //     .distinctUntilChanged()
        //     .switchMap(term => term
        //         ? this.productSearchService.search(term)
        //         : Observable.of<Product[]>([]))
        //     .catch(error => {
        //         console.log(error);
        //         return Observable.of<Product[]>([]);
        //     });
        this.productService.getAll().subscribe(products => this.products = products);
    }

    gotoDetail(product: Product): void {
        this.router.navigate(['/detail', product.id]);
    }

    search(name: string): void {
        this.searchTerms.next(name);
    }
}
