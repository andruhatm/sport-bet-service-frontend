import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalCabinetComponent } from './components/personal-cabinet-component/personal-cabinet.component';
import { PersonalCabinetPage } from './pages/personal-cabinet/personal-cabinet.page';
import { PersonalCabinetRoutingModule } from './personal-cabinet-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ValidationModule } from '../../features/validators/validation.module';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    PersonalCabinetComponent,
    PersonalCabinetPage,
  ],
  imports: [
    CommonModule,
    PersonalCabinetRoutingModule,
    MatIconModule,
    CloudinaryModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    ValidationModule,
    MatOptionModule,
    MatSelectModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ]
})
export class PersonalCabinetModule {}
