/**
 * Created by 11206 on 2017/5/28.
 */

import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from './order';
import { AccountService } from './account.service';
import { UserService } from "../user/user.service";

export class Cart implements OnInit {
    order: Order[];

    constructor (
        private accountService: AccountService,
        private userService: UserService) {}

    ngOnInit():void {

    }
}