import { Component, OnInit } from '@angular/core';

import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'chat-box',
    templateUrl: './chat-box.component.html'
})
export class ChatBoxComponent implements OnInit {
    currentUser: User

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getCurrent().subscribe(user => this.currentUser = user);
    }
}