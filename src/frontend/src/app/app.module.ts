import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { NavBarComponent } from './nav-bar.component'
import { FooterComponent } from './footer.component'
import { ChatBoxComponent } from './chat/chat-box.component';
import { ProductListComponent } from './product/product-list.component';
import { UserBarComponent } from './user/user-bar.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports:      [ BrowserModule, AppRoutingModule ],
    declarations: [ AppComponent, NavBarComponent, FooterComponent, ChatBoxComponent, ProductListComponent,
        UserBarComponent, LoginComponent, SignupComponent ],
    bootstrap:    [ AppComponent, NavBarComponent, FooterComponent ],
    providers: [ ]
})
export class AppModule { }
