import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../features/form/services/common.service';
import { ExistingEvent } from '../../../../features/events/models/existing-event.model';
import { EventsService } from '../../../../features/events/services/events.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CurrentUserImpl, CurrentUserService } from '../../../../core/auth/current-user.service';
import { DefaultOrganizer } from '../../../../features/users/models/default-organizer.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  events: ExistingEvent[];
  user: CurrentUserImpl;
  date: Date;
  defaultOganizer: DefaultOrganizer;
  dateString: string;
  currentTutorial = null;
  currentIndex = -1;
  pagesCount: number;
  title = '';
  modal = false;

  loading = false;

  page = 1;
  count = 0;
  pageSize = 15;
  query = 'empty';

  eventsCount: bigint;
  isEmptyResponse = false;

  constructor(
    private readonly commonService: CommonService,
    private readonly eventsService: EventsService,
    public readonly datepipe: DatePipe,
    private readonly currentUserService: CurrentUserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.isEmptyResponse = false;
    route.params.subscribe((val) => {
      console.log(val);
      this.pageSize = 15;
      this.retrieveNearestEvents();
    });
  }

  initUser(): void {
    this.currentUserService.user$.subscribe((value: CurrentUserImpl) => {
      this.user = value;
    });
    console.log(this.user);
  }

  ngOnInit(): void {
    this.initUser();
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveNearestEvents();
  }

  retrieveNearestEvents(): void {
    console.log(this.user);

    this.date = new Date(Date.now());
    const params = this.getRequestParams(this.page, this.pageSize);

    this.eventsService.getFiltered(params).subscribe(
      (response) => {
        if (response !== null) {
          console.log('response != null');
          const { events, totalItems, totalPages } = response;
          if (totalItems === 0) {
            console.log('totalItems is null');
            this.isEmptyResponse = true;
          } else {
            console.log('events setteed');
            this.isEmptyResponse = false;
            this.events = events;
          }
          this.count = totalItems;
          this.pagesCount = totalPages;
          console.log('response' + response);
        } else {
          console.log('response == null');
          this.isEmptyResponse = true;
        }
      },
      () => {
        console.log('error in lenta');
      }
    );
  }

  getRequestParams(page, pageSize): object {
    const params = {};

    params[`page`] = page - 1;

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
}
