import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainPage } from './pages/main/main.page';
import { FeedComponent } from './components/feed/feed.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { FeedRoutingModule } from './feed-routing.module';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { BetsComponent } from './components/bets/bets.component';
import { MatButtonModule } from '@angular/material/button';
import { PlaceBetComponent } from './components/place-bet/place-bet.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MainPage, FeedComponent, BetsComponent, PlaceBetComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    NgxPaginationModule,
    CloudinaryModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [],
  providers: [DatePipe]
})
export class FeedModule {}
