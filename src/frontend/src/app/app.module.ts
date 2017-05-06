import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChatModule } from './../chat/chat.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

import { AppComponent }  from './app.component';
import { NavBarComponent } from './nav-bar.component'
import { FooterComponent } from './footer.component'

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports:      [ BrowserModule, ChatModule, ProductModule, UserModule, AppRoutingModule ],
    declarations: [ AppComponent, NavBarComponent, FooterComponent ],
    bootstrap:    [ AppComponent, NavBarComponent, FooterComponent ]
})
export class AppModule { }
