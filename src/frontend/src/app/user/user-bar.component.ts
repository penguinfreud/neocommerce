import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { UserService } from './user.service';

@Component({
    selector: 'user-bar',
    templateUrl: './user-bar.component.html',
})
export class UserBarComponent implements OnInit {
    currentUser: User

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit() {
        this.userService.getCurrent().subscribe(user => this.currentUser = user);
    }

    returnUrl() {
        return this.router.routerState.snapshot.url;
    }

    logout() {
        this.userService.logout();
    }
}
