import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { LibModule } from '../lib/lib.module';

@NgModule({
    imports: [AppModule, ServerModule, LibModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
