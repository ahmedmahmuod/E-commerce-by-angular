import { OrderModel } from './../../../core/models/order/order.model';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OrdersActions from './orders.actions';
import { OrdersService } from '../../../core/services/orders/orders.service';

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);
  private ordersService = inject(OrdersService);

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap((action) =>
        this.ordersService.getOrdersUser(action.userId).pipe(
          map((orders) => OrdersActions.loadOrdersSuccess({orders})),
          catchError((error) => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );
}
