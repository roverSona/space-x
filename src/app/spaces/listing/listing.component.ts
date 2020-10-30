import { Component, OnInit, HostListener } from '@angular/core';
import { SpacesService } from '../services/spaces.service';
import { Constants } from '../../constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Space, Filters } from '../space';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

    public spaceListing: Space[] = [];
    public defaultFilters: Filters = {
        limit: Constants.NUMBERS.TWENTY,
        launch_success: '',
        land_success: '',
        launch_year: ''
    };
    public yearFilters = Constants.YEAR_FILTERS;
    public firstLoad = true;
    constructor(
        private readonly spaceService: SpacesService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        this.checkQueryParams();
    }


    checkQueryParams(): void {
        this.route.queryParams.subscribe(params => {
            if (params.limit) {
                this.defaultFilters = {
                    ...this.defaultFilters,
                    limit: params.limit,
                    land_success: params.land_success,
                    launch_success: params.launch_success,
                    launch_year: params.launch_year
                };
                this.getSpaceData(params as Filters);
            } else {
                this.getSpaceData(this.defaultFilters);
            }
        });
    }

    changeQueryParams(params): Promise<boolean> {
        return this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: params,
                queryParamsHandling: 'merge'
            });
    }

    getDataByFilter(selectedFilter: string, value: unknown): void {
        this.defaultFilters[selectedFilter] = value;
        this.changeQueryParams(this.defaultFilters);
    }


    getSpaceData(params: Filters): void {
        this.spaceService.getSpaceData({ ...params }).subscribe((data: Space[]) => {
            this.spaceListing = data;
            if (this.firstLoad) {
                this.firstLoad = !this.firstLoad;
            }
        });
    }

    @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(event): void {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
            Number(this.defaultFilters.limit) < Constants.NUMBERS.ONETWENTY &&
            Number(this.defaultFilters.limit) === this.spaceListing?.length) {
            this.defaultFilters = {
                ...this.defaultFilters,
                limit: Number(this.defaultFilters.limit) + Constants.NUMBERS.TWENTY
            };
            this.changeQueryParams(this.defaultFilters);
        }
    }

}
