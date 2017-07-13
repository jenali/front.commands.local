import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
declare let localStorage: Storage;

@Injectable()
export class LoggedInGuard implements CanActivate {

    /**
     * Is login user.
     * @type {boolean}
     */
    public loggedIn:boolean = false;

    constructor(private router: Router) {
        this.loggedIn = !!localStorage.getItem('Authorization');
    }

    /**
     * Can active router.
     * @returns {boolean}
     */
    canActivate() {
        // @todo: реализовать запрос к серверу для проверки токена
        let login = this.isLoggedIn();
        if (!login) {
            this.router.navigate(['login']);
        }
        return this.isLoggedIn();
    }

    /**
     * Is Logged in.
     * @returns {boolean}
     */
    private isLoggedIn():boolean {
        return this.loggedIn;
    }

    /**
     * Logout.
     */
    public logout():void
    {
        localStorage.removeItem('Authorization');
        this.loggedIn = false;
    }

    /**
     * Set Token in storage and login.
     * @param $token
     */
    public setToken($token:string):void {
        localStorage.setItem('Authorization',$token);
        this.loggedIn = true;
    }
}
