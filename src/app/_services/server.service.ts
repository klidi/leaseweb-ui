import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Server } from '@/_models';
import {map, tap} from "rxjs/operators";
import {AbstractControl} from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ServerService {
    constructor(private http: HttpClient) { }

    findAll(userId) {
        let servers = [];

        return this.http.get<any>(`${config.apiUrl}/api/users/${userId}/servers`)
            .pipe(map(result => {
                console.log(result);
                // i am not casting the price, brand and ramModules to proper as this has to be a simple ui so im trying to be quick
                result.data.forEach(element => {
                    let server = new Server();
                    server.id = element.id;
                    server.assetId = element.asset_id;
                    server.name = element.name;
                    server.brand = element.brand;
                    server.price = element.price;
                    server.ramModules = element.ram_modules;
                    servers.push(server);
                });
                return servers;
            }));
    }

    save(userId, serverForm)
    {
        let server = {
            asset_id: serverForm.assetId.value,
            name: serverForm.name.value,
            brand_id: serverForm.brand.value,
            price: {
                amount: serverForm.price.value,
                currency: "EUR",
            },
            ram_modules: serverForm.ramModules.value
        };

        return this.http.post(`${config.apiUrl}/api/users/${userId}/servers`, server)
            .pipe(map(result => {
                console.log(result);
            }));
    }


    findOne(userId, serverId) {
        return this.http.get(`${config.apiUrl}/api/users/${userId}/servers/${serverId}`);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/api/users/${id}`);
    }
}
