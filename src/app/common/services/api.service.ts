import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { HttpService } from './http.service';
import { ConfigService } from './config.service';
import { Request } from '../interfaces/request';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ApiService {

    private showPreloading: boolean = false;

    constructor ( protected http: HttpService) {
    }

    /**
     * Send method get to api
     *
     * @param request
     * @returns {Promise<any>}
     */
    public apiGet ( request: Request ): Promise<any> {
        this.beforeSend( request );
        let data = null;
        if ( request.data ) {
            data = { search: this.convertToSearchParams( request.data ) };
        }
        return this.http.get( this.getUrl( request ), data )
            .toPromise()
            .then( ( res ) => this.http.extractData( res ) )
            .then( ( res ) => this.afterSend( res ) )
            .catch( this.http.handleError );
    }

    /**
     * Send method get by id to api
     *
     * @param request
     * @returns {Promise<any>}
     */
    public apiGetById ( request: Request ): Promise<any> {
        this.beforeSend( request );
        return this.http.get( this.getUrl( request ) )
            .toPromise()
            .then( ( res ) => this.http.extractData( res ) )
            .then( ( res ) => this.afterSend( res ) )
            .catch( this.http.handleError );
    }

    /**
     * Create new element
     *
     * @param request
     * @returns {Promise<any>}
     */
    public apiCreate ( request: Request ): Promise<any> {
        this.beforeSend( request );
        return this.http.post( this.getUrl( request ), JSON.stringify( request.data ) )
            .toPromise()
            .then( ( res ) => this.http.extractData( res ) )
            .then( ( res ) => this.afterSend( res ) )
            .catch( this.http.handleError );
    }

    /**
     * Update element by id.
     *
     * @param request
     * @returns {Promise<any>}
     */
    public apiUpdate ( request: Request ): Promise<any> {
        this.beforeSend( request );
        return this.http.put( this.getUrl( request ), JSON.stringify( request.data ) )
            .toPromise()
            .then( ( res ) => this.http.extractData( res ) )
            .then( ( res ) => this.afterSend( res ) )
            .catch( this.http.handleError );
    }

    /**
     * Delete element by id
     *
     * @param request
     * @returns {Promise<any>}
     */
    public apiDelete ( request: Request ): Promise<any> {
        this.beforeSend( request );
        return this.http.delete( this.getUrl( request ) )
            .toPromise()
            .then( ( res ) => this.http.extractData( res ) )
            .then( ( res ) => this.afterSend( res ) )
            .catch( this.http.handleError );
    }

    /**
     * Before save.
     *
     * @param request
     */
    private beforeSend ( request: Request ) {

    }

    /**
     * After save.
     *
     * @param res
     * @returns {any}
     */
    private afterSend ( res: any ) {

    }

    /**
     * Get url
     *
     * @param request
     * @returns {string}
     */
    private getUrl ( request: Request ) {
        let url: string = ConfigService.getApiUrl( request.url );
        if ( request.id ) {
            url += '/' + request.id;
        }
        return url;
    }



    /**
     * Convert to search params
     *
     * @param data
     * @param prefix
     * @param preKey
     * @param params
     * @returns {URLSearchParams}
     */
    private convertToSearchParams ( data: any,
                                    prefix: string = '',
                                    preKey: string = '',
                                    params: URLSearchParams = null ): URLSearchParams {
        if ( !params ) {
            params = new URLSearchParams();
        }
        let keys = Object.keys( data );

        keys.forEach( ( key: string ) => {
            if ( typeof data[ key ] === 'object' ) {
                const newKey = preKey ? `${preKey}[${key}]` : key;
                params = this.convertToSearchParams( data[ key ], `${newKey}[]`, key, params );
            } else if ( !prefix ) {
                params.set( key, data[ key ] );
            } else {
                params.set( prefix.replace( '[]', `[${key}]` ), data[ key ] );
            }
        } );
        return params;
    }

}
