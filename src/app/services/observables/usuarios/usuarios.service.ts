import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
//import { UserCRM } from 'app/models/user.model';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsuarioObservable
{
    /* private _httpClient = inject(HttpClient);
    private _user: ReplaySubject<UserCRM> = new ReplaySubject<UserCRM>(1); */

    private authDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private _user: ReplaySubject<any> = new ReplaySubject<any>(1);


    constructor() {}

    // Método para actualizar los datos de autenticación
    setAuthData(data: any): void {
        this.authDataSubject.next(data);
    }

    // Método para obtener los datos de autenticación como observable
    getAuthData(): Observable<any> {
        return this.authDataSubject.asObservable();
    }

    setUser(value: any)
    {
        // Store the value
        this._user.next(value);
    }

    getUser(): Observable<any>
    {
        return this._user.asObservable();
    }

      
}
