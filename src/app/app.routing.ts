import { Routes, RouterModule } from '@angular/router';

import { ServersComponent } from './servers';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import {CreateServerComponent} from "@/servers/create.server.component";

const routes: Routes = [
    { path: '', component: ServersComponent, canActivate: [AuthGuard] },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'servers', component: ServersComponent, canActivate: [AuthGuard]},
    { path: 'servers/create', component: CreateServerComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
