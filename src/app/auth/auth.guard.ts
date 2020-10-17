import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): 
    boolean
    | UrlTree
    | Promise<boolean> 
    | Observable<boolean | UrlTree> {//this is defined by default
        return this.authService.user.pipe(
            take(1), //make sure we just take the latest user value and then unsubscribe for this guard
            map(user => {//in order to return a boolean, we check if the user data exist or not
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);//need to redirect to auth when the condition is false(when type in /recipes in url)
        }));
    }

}