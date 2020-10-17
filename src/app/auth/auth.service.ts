import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {//export it so that we can use in auth.component.ts
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;//optional, for login method
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    //store the user data. BehaviorSubject gives the user acccess to the previously emitted value. That means we can get access to the currently active user even if we only subscribe after that user has been emitted. That means when we fetch data and we need that token at this point of time, even if the user logged in before, we get access to that lastest user.
    //BehaviorSubject needs to be initialized with a starting value

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUEFonF75tiyXoBAe7uBWa33rVieyzSgo',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUEFonF75tiyXoBAe7uBWa33rVieyzSgo',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        }
         = JSON.parse(localStorage.getItem('userData'));//convert string to javascript object

        if (!userData) {//if we don't have user data stored/not logged in
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)//convert date string back to date object
        );

        if (loadedUser.token) {//this is true when the token hasn't expired
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();//in milliseconds
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');//remove data when logout
        //on logout click, we should check if we do have an active timer and clear that timer if the timer is not expired yet
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        //expiresIn is the number of seconds in which the ID token expires. new Date().getTime() is the current timestamp in milliseconds. the new Date wrapper outside convert it into a date object.
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);//set/emmit this as our now currently logged in user
        this.autoLogout(expiresIn * 1000); //Whenever we emit a new user, we want to use auto logout. We expect milliseconds in auto logout.
        localStorage.setItem('userData', JSON.stringify(user));//In order to refresh the page still keep the login status, we need to store the user data. key is userData, data stored is the string.
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }//incase of some other errors other than the signup errors
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This PASSWORD IS NOT CORRECT';
                break;
        }//'EMAIL_EXISTS' this is from the signup error
        return throwError(errorMessage);
    }
}