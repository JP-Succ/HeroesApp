import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor (private authService:AuthService,
               private router: Router ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    
      return this.authService.verificaAutenticacion()
                  .pipe(
                    tap( estaAutenticado => {
                      if( !estaAutenticado ){
                        this.router.navigate(['./auth'])
                      }
                    })
                  )
    /*  if (this.authService.auth.id) {
        return true;
       }
      console.log('bloqueado por el authguard - can activate');
      return false;
      */
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean > | boolean  {
    
      return this.authService.verificaAutenticacion()
                .pipe(
                  tap( estaAutenticado => {
                    if( !estaAutenticado ){
                      this.router.navigate(['./auth'])
                    }
                  })
                )
    /*
      if (this.authService.auth.id) {
      return true;
     }
    console.log('bloqueado por el authguard - can load');
    return false;
    */
  }
}
