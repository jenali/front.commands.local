import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare let localStorage: Storage;
import { ResponseData } from '../interfaces/response';

@Injectable()
export class HttpService extends Http {

    /**
     * Constructor
     */
    public constructor ( backend: XHRBackend, options: RequestOptions ) {
        let token = localStorage.getItem( 'Authorization' ); // your custom token getter function here
        options.headers.set( 'Authorization', `Bearer ${ token }` );
        super( backend, options );
    }

    /**
     * Request
     */
    public request ( url: string | Request, options?: RequestOptionsArgs ): Observable<Response> {
        let token = localStorage.getItem( 'Authorization' );
        if ( typeof url === 'string' ) { // meaning we have to add the token to the options, not in url
            if ( !options ) {
                // let's make option object
                options = { headers: new Headers() };
            }
            options.headers.set( 'Authorization', `Bearer ${ token }` );
            options.headers.set( 'Content-Type', `application/json` );
        } else {
            // we have to add the token to the url object
            url.headers.set( 'Authorization', `Bearer ${ token }` );
            url.headers.set( 'Content-Type', `application/json` );
        }
        return super.request( url, options ).catch( this.catchAuthError() );
    }

    /**
     * Extract data
     */
    public extractData ( res: Response ): any {
        let body: ResponseData = res.json();
        if ( body.success ) {
            return body.data || true;
        } else {
            return body.data || false;
        }
    }

    /**
     * Handle error
     */
    public handleError ( error: Response | any ) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if ( error instanceof Response ) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify( body );
            errMsg = `${ error.status } - ${ error.statusText || '' } ${ err }`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error( errMsg );
        return Observable.throw( errMsg );
    }


    /**
     * Catch error
     */
    private catchAuthError () {
        // we have to pass HttpService's own instance here as `self`
        return ( res: Response ) => {
            // console.log(res);
            if ( res.status === 401 || res.status === 403 ) {
                // if not authenticated
                console.log( res );
            }
            return Observable.throw( res );
        };
    }
}
