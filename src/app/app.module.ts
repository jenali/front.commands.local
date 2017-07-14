import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpModule } from '@angular/http';

//components
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {CommandsComponent} from './commands/commands.component';

// services
import {ConfigService} from './common/services/config.service';
import {ApiService} from './common/services/api.service';
import {HttpService} from './common/services/http.service';
import {LoggedInGuard} from './common/services/logged-in.guard'

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CommandsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    providers: [
        ConfigService,
        ApiService,
        LoggedInGuard,
        {
            provide: HttpService,
            useFactory: ( backend: XHRBackend, options: RequestOptions ) => {
                return new HttpService( backend, options );
            },
            deps: [ XHRBackend, RequestOptions ]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
