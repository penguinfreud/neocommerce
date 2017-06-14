import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavBarComponent } from './nav-bar.component'
import { FooterComponent } from './footer.component'
import { ChatBoxComponent } from './chat/chat-box.component';
import { ProductListComponent } from './product/product-list.component';
import { UserBarComponent } from './user/user-bar.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { AlertComponent } from './util/alert.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { AppRoutingModule } from './app-routing.module';
import { AlertService } from './util/alert.service';
import { AuthGuard } from './user/auth.guard';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { AccountService } from './checkout/account.service';

import {fakeBackendProvider} from './util/fake-backend';
import {MockBackend} from '@angular/http/testing';

@NgModule({
    imports:      [ BrowserModule, AppRoutingModule, FormsModule, HttpModule ],
    declarations: [
        AppComponent,
        NavBarComponent,
        FooterComponent,
        ChatBoxComponent,
        ProductListComponent,
        UserBarComponent,
        LoginComponent,
        SignupComponent,
        AlertComponent,
        ProductDetailComponent,
        CheckoutComponent,
    ],
    bootstrap: [ AppComponent ],
    providers: [
        AlertService, AuthGuard,
        UserService,
        ProductService,
        AccountService,

        //BaseRequestOptions,
        //fakeBackendProvider,
        //MockBackend
     ]
})
export class AppModule { }
