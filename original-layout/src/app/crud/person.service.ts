import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { PersonEntity } from '../models/PersonEntity.model';


@Injectable()
export class PersonService
{
    
    tabChanged: BehaviorSubject<any>;
    subjectMode: Subject<string> = new Subject();
    
    routeParams: any;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
    )
    {
        // Set the defaults
       
        this.tabChanged = new BehaviorSubject({});
    }

   
    /**
     * Get Persons
     *
     * @returns {Promise<any>}
     */
    getPersons(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.baseUrl}/person/all`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    /**
     * Get Person By Id
     *
     * @returns {Promise<any>}
     */
    getPerson(id: number): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.baseUrl}/person/get/${id}`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Create Person
     *
     * @returns {Promise<any>}
     */
    createPerson(person: PersonEntity): Promise<any>{
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.baseUrl}/person/new`, person, { responseType: 'blob'})
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }


    /**
     * Update Person
     *
     * @returns {Promise<any>}
     */
     updatePerson(person: PersonEntity, id: number): Promise<any>{
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${environment.baseUrl}/person/edit/${id}`, person, { responseType: 'blob'})
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }


    /**
     * Update Person
     *
     * @returns {Promise<any>}
     */
    deletePerson(id: number): Promise<any>{
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${environment.baseUrl}/person/delete/${id}`, { responseType: 'blob'})
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }

    // searchFilterPaginator(filter:any): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.post(`${environment.restUrl}/rest/client/searchFilterPaginator`,filter)
    //             .subscribe((response: any[]) => {
    //                 resolve(response);
    //             }, reject);
    //     });
    // }

    // getUserAffililate(idaffiliate:number): Promise<any[]>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get(`${environment.restUrl}/rest/affiliate/user/all/${idaffiliate}`)
    //             .subscribe((response: any[]) => {
    //                 this.onUsersAffiliateChanged.next(response);
    //                 resolve(response);
    //             }, reject);
    //     });
    // }


    // getAllByAffiliateProcedureEvent(idAffiliate:number): Promise<any[]>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get(`${environment.restUrl}/rest/affiliateProcedureEvent/getAllByAffiliate/${idAffiliate}`)
    //             .subscribe((response: any[]) => {
    //                 resolve(response);
    //             }, reject);
    //     });
    // }

   

    
    // getUserByClient(idClient): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get(`${environment.restUrl}/rest/affiliate/user/get/${idClient}`)
    //             .subscribe((response: any) => {
    //                 this.onUserClientChanged.next(response);
    //                 resolve(response);
    //             }, reject);
    //     });
    // }

   



}
