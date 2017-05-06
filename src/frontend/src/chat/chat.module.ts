import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChatBoxComponent } from './chat-box.component';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ ChatBoxComponent ],
    exports: [ ChatBoxComponent ]
})
export class ChatModule {}