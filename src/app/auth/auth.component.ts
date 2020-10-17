import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }//this is a double check preventing submit invalid data
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        }
        else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(
            resData => {//if successful
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);//navigate only when the login is done
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage // errorMessage is set in the service file
                this.isLoading = false;
            }
        );

        form.reset();
    }
}