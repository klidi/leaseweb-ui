import { Component, OnInit } from '@angular/core';
import {first, toArray} from 'rxjs/operators';

import { User } from '@/_models';
import {AuthenticationService, ServerService} from '@/_services';

@Component({ templateUrl: 'servers.component.html' })
export class ServersComponent implements OnInit {
    currentUser: User;
    servers = [];

    constructor(
        private authenticationService: AuthenticationService,
        private serverService: ServerService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.serverService.findAll(this.currentUser.id)
            .pipe(first())
            .subscribe(servers => {
                this.servers = servers;
            });
    }

    public totalRam(ramRodules)
    {
        let totalRam = 0;
        ramRodules.forEach(ramModule =>{
            totalRam += ramModule.size;
        })
        return totalRam;
    }

    private extractData()
    {

    }

    // private loadAllUsers() {
    //
    // }


}
