import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListingComponent } from './listing.component';
import { of } from 'rxjs/internal/observable/of';
import { ActivatedRoute } from '@angular/router';
import { SpacesService } from '../services/spaces.service';

describe('ListingComponent', () => {
    let component: ListingComponent;
    let fixture: ComponentFixture<ListingComponent>;
    let spaceService: SpacesService;
    let route: ActivatedRoute;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListingComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of(
                            {
                                land_success: true
                            }
                        ),
                        params: of(
                            {
                                land_success: false
                            }
                        )
                    }
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListingComponent);
        component = fixture.componentInstance;
        spaceService = TestBed.inject(SpacesService);
        route = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('space list on getSpaceData called', fakeAsync(() => {
        const spy = spyOn(spaceService, 'getSpaceData')
            .withArgs({ limit: 100 }).and.returnValue(of([]));
        component.getSpaceData({ limit: 100 });
        spy.calls.mostRecent().returnValue.subscribe(() => {
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
        });
        fixture.destroy();
        flush();
    }));
});
