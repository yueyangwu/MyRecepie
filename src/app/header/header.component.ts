import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        });
        //this user is either null if we are not logged in, or exists if we are logged in
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}