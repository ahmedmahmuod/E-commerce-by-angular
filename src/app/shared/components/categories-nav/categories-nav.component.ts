import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as CategoriesActions from '../../../stores/categories-store/categories.actions';
import { selectCategories } from '../../../stores/categories-store/categories.selectors';
import { BrandsModel } from '../../../core/models/brands/brands.model';

@Component({
  selector: 'app-categories-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-nav.component.html',
  styleUrl: './categories-nav.component.css',
})
export class CategoriesNavComponent {
  private router = inject(Router);

  categories = signal<BrandsModel[]>([]);

  constructor(private store: Store) {
    // Call ngrx store to get all Categories
    this.store.dispatch(CategoriesActions.loadCategories());
    effect(
      () => {
        this.store
          .select(selectCategories)
          .subscribe((categories) => this.categories.set(categories));
      },
      { allowSignalWrites: true }
    );
  }

  // On click Category to send id category to get products
  onCategoryNav(category: BrandsModel) {
    this.router.navigate(['/category',category._id], {state: {title: category.name}});
  }
}
