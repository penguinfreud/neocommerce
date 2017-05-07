import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { Product } from './product';

const PRODUCTS: Product[] = [
    {id:1, name: "Hetzer_2", desc: "The Jagdpanzer 38 (Sd.Kfz. 138/2), later known as Hetzer (\"pursuer/hunter\"), was a German light tank destroyer of the Second World War based on a modified Czechoslovakian Panzer 38(t) chassis. The project was inspired by the Romanian \"Mareşal\" tank destroyer.",
        price: 6553600, buyers: 64, provider: "NEOCommerce", factory: "Shanghai"},
    {id:2, name: "Mercedes-Benz-G500", desc: "The Mercedes-Benz G-Class or G-Wagen, short for Geländewagen (or cross-country vehicle), is a four-wheel drive vehicle / sport utility vehicle (SUV) produced by German automaker Mercedes-Benz. It was borne by proposals for a military vehicle in the early 1970s by the Shah Mohammad Reza Pahlavi of Iran, a major Daimler-Benz shareholder. Developed in co-operation with the Austrian car manufacturer Steyr-Daimler-Puch, production of the G-Class began in 1979 with the 460 Series models. The G-Class has been sold under the Puch name in certain markets, and the Peugeot P4 is a variant made under license, with a Peugeot engine and other equipment. The chassis was revised for 1990 as the W463 with anti-lock brakes, full-time 4WD and a full trio of electronically-locking differentials. The interior was totally upgraded, finished with wooden accents and optional leather upholstery.",
        price: 88888, buyers: 256, provider: "NEOCommerce", factory: "Beijing"},
    {id:3, name: "mystik_dsrv_CC50", desc: "DSRV-1 Mystic is a Deep Submergence Rescue Vehicle that is rated to dive up to 5000 feet (1500 m). DSRV-1 was built by Lockheed for the U.S. Navy at a construction cost of $41 million and launched 24 January 1970. She was declared fully operational in 1977 and named \"Mystic\". The submarine, intended to be air transportable, was 50 feet (15 m) long, 8 feet (2.4 m) in diameter, and weighed 37 tons. The sub was capable of descending to 5,000 feet (1,500 m) below the surface and could carry 24 passengers at a time in addition to her crew.",
        price: 12335242, buyers: 8, provider: "NEOCommerce", factory: "Shenzhen"}
];

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

    getProducts(): Promise<Product[]> {
        return Promise.resolve(PRODUCTS);
    }

    getProduct(id: number): Promise<Product> {
        for (var p of PRODUCTS) {
            if (p.id == id) {
                return Promise.resolve(p);
            }
        }
        return Promise.resolve({id: 0, name: "Null", desc:"Internal Error", price: 0, provider:"None", factory:"Here"});
    }
}
