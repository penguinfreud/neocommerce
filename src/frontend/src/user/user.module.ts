import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UserBarComponent } from './user-bar.component';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ UserBarComponent ],
    exports: [ UserBarComponent ]
})
export class UserModule { }
