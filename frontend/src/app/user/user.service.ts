import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { User } from './user';
import {ReplaySubject} from "rxjs/ReplaySubject";

let reqOpt = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) });

@Injectable()
export class UserService {
    private currentUser: ReplaySubject<User> = new ReplaySubject<User>(1);
    constructor(private http: Http) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.token) {
            this.currentUser.next(currentUser);
        }
    }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.jwt(true)).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt(true)).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getCurrent(): Observable<User> {
        return this.currentUser.asObservable();
    }

    login(username: string, password: string) {
        return this.http.post('/api/login', JSON.stringify({ userName: username, password: password }), reqOpt)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUser.next(user);
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser.next(null);

        this.http.get('/api/logout', this.jwt());
    }

    // private helper methods

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
