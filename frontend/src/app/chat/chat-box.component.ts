import { Component, OnInit } from '@angular/core';

import { User, UserType } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'chat-box',
    templateUrl: './chat-box.component.html'
})
export class ChatBoxComponent implements OnInit {
    currentUser: User;
    users: User[];
    CUSTOMER: UserType = UserType.CUSTOMER;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getCurrent().subscribe(user => this.currentUser = user);
        this.userService.getAll().subscribe(users => this.users = users);
    }
}
