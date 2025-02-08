import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-product-filters',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
    templateUrl: './products-filter.component.html',
    styleUrls: ['./products-filter.component.css']
})
export class ProductFiltersComponent implements OnInit {
  // get data from parent
  @Input({ required: true }) brands!: [];
  @Input({ required: true }) categories!: [];

  // send data to parent
  @Output() filterFormValues = new EventEmitter<any>();

  // Global Variables
  filterForm: FormGroup;

  // Constructor
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      searchQuery: [''],
      selectedCategory: ['all'],
      selectedBrand: ['all'],
      selectedPriceRange: ['all'],
    });
  }

  // OnInit
  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe((values) => {
      this.sendFilterFormValues(values);
    });
  }

  // Reset the filter form
  resetFilters(): void {
    this.filterForm.reset({
      searchQuery: '',
      selectedCategory: 'all',
      selectedBrand: 'all',
      selectedPriceRange: 'all',
    });
  }

  // Send Data filter form to parent
  sendFilterFormValues(values: any) {
    this.filterFormValues.emit(values);
  }
}
