import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css',
})
export class ProductFiltersComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  searchQuery: string = '';
  selectedCategory: string = '';
  selectedBrand: string = '';
  selectedPriceRange: string = '';

  categories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Books' },
  ];

  brands = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Samsung' },
    { id: '3', name: 'Nike' },
  ];

  priceRanges = [
    { id: '1', name: 'Low to High', sort: 'asc' },
    { id: '2', name: 'High to Low', sort: 'desc' },
  ];

  applyFilters(): void {
    this.filtersChanged.emit({
      search: this.searchQuery,
      category: this.selectedCategory,
      brand: this.selectedBrand,
      priceSort: this.selectedPriceRange
        ? this.priceRanges.find((range) => range.id === this.selectedPriceRange)
            ?.sort
        : null,
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.selectedPriceRange = '';
    this.applyFilters();
  }
}
