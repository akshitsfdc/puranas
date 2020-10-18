import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    
constructor(public auth: AuthService, public router: Router) {}

 canActivate():boolean|Promise<boolean> {
    return this.auth.getUser()
            .then(user => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['']);
                    return false;
                }
            })
            .catch((error) => { return false; });
  }

}