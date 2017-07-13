import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

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
        AppRoutingModule
    ],
    providers: [
        ConfigService,
        ApiService,
        HttpService,
        LoggedInGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
