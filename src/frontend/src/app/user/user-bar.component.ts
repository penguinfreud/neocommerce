import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { CurrentUserService } from './current-user.service';

@Component({
  selector: 'user-bar',
  templateUrl: './user-bar.html',
})
export class UserBarComponent implements OnInit  {
    constructor(private curUserService: CurrentUserService) {}

    ngOnInit() {
        
    }
}
