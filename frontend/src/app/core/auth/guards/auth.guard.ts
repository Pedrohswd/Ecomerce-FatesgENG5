import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from '../auth.utils';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanMatch, CanActivate
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    )
    {
    }
    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (this._authService.check()) {
          // Verifique a ROLE do usuário autenticado
          const userRole = AuthUtils.getUserRole();
          // Verifique se a ROLE do usuário permite acessar a rota
          if (this.checkUserRoleForRoute(userRole, next)) {
            return true;
          } else {
            this._router.navigate(['/unauthorized']); // ou qualquer outra rota para acesso não autorizado
            return false;
          }
        } else {
          this._router.navigate(['/sing-in']); // redirecionar para o login se não autenticado
          return false;
        }
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can match
     *
     * @param route
     * @param segments
     */
    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this._check(segments);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    private checkUserRoleForRoute(userRole: string, route: ActivatedRouteSnapshot): boolean {
        // Obtenha a ROLE necessária para acessar a rota
        const requiredRole = route.data.requiredRole;
        console.log(requiredRole)
        // Verifique se o usuário tem permissão para acessar a rota
        return userRole === requiredRole;
      }
    /**
     * Check the authenticated status
     *
     * @param segments
     * @private
     */
    private _check(segments: UrlSegment[]): Observable<boolean | UrlTree>
    {
        // Check the authentication status
        return this._authService.check().pipe(
            switchMap((authenticated) => {

                // If the user is not authenticated...
                if ( !authenticated )
                {
                    // Redirect to the sign-in page with a redirectUrl param
                    const redirectURL = `/${segments.join('/')}`;
                    const urlTree = this._router.parseUrl(`sign-in?redirectURL=${redirectURL}`);

                    return of(urlTree);
                }

                // Allow the access
                return of(true);
            })
        );
    }
}
