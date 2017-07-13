import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommandsComponent} from './commands/commands.component';
import {LoginComponent} from './login/login.component';

import {LoggedInGuard} from './common/services/logged-in.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'commands',
        component: CommandsComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: '',
        redirectTo: 'commands',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'commands'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
