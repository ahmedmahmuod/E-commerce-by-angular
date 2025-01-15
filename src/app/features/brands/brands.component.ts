import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsModel } from '../../core/models/brands/brands.model';
import { Store } from '@ngrx/store';
import * as BrandsActions from '../../stores/brands-store/brands.actions';
import { selectBrands, selectBrandsLoading } from '../../stores/brands-store/brands.selectors';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { HomeHeaderPageComponent } from '../../shared/components/home-header/home-header-page.component';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";
import { GlobalBtnComponent } from "../../shared/components/buttons/global-btn/global-btn.component";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    HomeHeaderPageComponent,
    PageTitleComponent,
    GlobalBtnComponent
],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private router = inject(Router);

  brands$!: Observable<BrandsModel[]>;
  displayedBrands$!: Observable<BrandsModel[]>;
  initialDisplayCount = 8;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store) {
    // Get brands from store
    this.store.dispatch(BrandsActions.loadBrands());

    this.store.select(selectBrands).subscribe((brands: BrandsModel[]) => {
      this.brands$ = of(brands);
      this.displayedBrands$ = of(brands.slice(0, this.initialDisplayCount));
      if (brands.length <= 0) {
        this.store.select(selectBrandsLoading).subscribe((loading: boolean) => {
          this.isLoading$ = of(loading);
        });
      }
    });
  }

  // Click on view all brands
  clickViewAllBrands() {
    this.displayedBrands$ = this.brands$;
  }

  // Click on brand to get id
  onClickBrand(brand: BrandsModel) {
    this.router.navigate(['/brands',brand._id], {state: { title: brand.name }});
  }
}