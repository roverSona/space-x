import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Space, Filters } from '../space';

@Injectable({
  providedIn: 'root'
})
export class SpacesService {

    constructor(private readonly httpClient: HttpClient) { }

    getSpaceData(filterOption: Filters): Observable<Space[]> {
        const params = {
            ...filterOption,
            limit: filterOption.limit.toString()
        }
        return this.httpClient.get<Space[]>(Constants.API_URL, { params });
    }
}
