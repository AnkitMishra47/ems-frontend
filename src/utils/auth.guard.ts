import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { UtilsService } from "./utils.service";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuardService {

    constructor(private router: Router,
        private utilsService: UtilsService,
        private authService : AuthService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.utilsService.getRequest('EnvironmentInformation').pipe(
            map(
                (data) => {
                    if (this.utilsService.isSuccessfulResponse(data)) {

                        this.utilsService.setLoggedInUser(data.user);
                        return true;
                    }
                    else {
                        this.router.navigate(["not-found"]);
                        return false;
                    }
                }
            ),
            catchError(
                (err) => {
                    console.log(err);
                    this.router.navigate(["login"]);
                    return of(false);
                }
            )
        );
    };

}

export const AuthGuard: CanActivateFn = ((next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    return inject(AuthGuardService).canActivate(next, state);
})
