import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import {AlertService, AuthenticationService, ServerService} from '@/_services';

@Component({ templateUrl: 'create.server.component.html' })
export class CreateServerComponent implements OnInit {
    public createServerForm: FormGroup;
    public loading = false;
    public submitted = false;
    private returnUrl: string = "/servers";
    public ramModules: FormArray;
    private ramModulesCount = 0;

    // i will hard code things like brand, ram types and currency

    public brands = [
        {
            id: 1,
            name: 'Dell',
        },
        {
            id: 2,
            name: "HP",
        }
    ];

    public ramTypes = ['DDR3', 'DDR4', 'DDR5', 'DDR6'];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private serverService: ServerService,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        this.createServerForm = this.formBuilder.group({
            assetId: ['', Validators.required],
            name: ['', Validators.required],
            brand: ['', Validators.required],
            ramModules: this.formBuilder.array([]),
            price: ['', Validators.required],
        });

        this.ramModules = this.createServerForm.controls.ramModules as FormArray;
        this.ramModules.push(this.formBuilder.group({
            size: ['', Validators.required],
            type: ['', Validators.required],
        }));
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/servers';
    }

    public addModule() {
        if (this.ramModulesCount < 8) {
            this.ramModules.push(this.formBuilder.group({
                size: ['', Validators.required],
                type: ['', Validators.required],
            }));
            this.ramModulesCount++;
        }
    }

    public removeModule(index)
    {
        this.ramModules.removeAt(index);
        this.ramModulesCount--;
    }

    // convenience getter for easy access to form fields
    get f() { return this.createServerForm.controls; }

    submit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        if (this.createServerForm.invalid) {
            return;
        }

        this.loading = true;
        this.serverService.save(this.authenticationService.currentUserValue.id, this.f)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
