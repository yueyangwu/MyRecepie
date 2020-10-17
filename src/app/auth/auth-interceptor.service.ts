import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    //take operator only take one value from that observable, and then unsubscribe
    //exhaustMap() wait for the first parameter take(1) to complete. It gives us that user and then replace our previous observable with the inner observable we return inside the function(http observable).
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                //if we don't have a user(before signin), we don't modify the request. Request failed before it got sent. Because we are using the logic of interceptor for every outgoing request including signup and login request. We got null as a user because this is what we initialize our user at the beginning when app loads.
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq)
            })
        )
    }
    //intercept needs to get two arguments - the Http request and Http handler
    //We want to edit the request and add my token
}