/**
 * IMPORTANT! I stole this implementation from Nx to avoid installing Nx.
 *
 * @see https://nx.dev/latest/angular/guides/misc-data-persistence
 * @see https://github.com/nrwl/nx/blob/c0ce1ce65e76786a7dbf04583b80a2528923148f/packages/angular/src/runtime/nx/data-persistence.ts
 */
import {Injectable} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {Action, ActionCreator, Store} from '@ngrx/store';
import {isObservable, Observable, of} from 'rxjs';
import {catchError, concatMap, groupBy, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

/**
 * See {@link DataPersistence.fetch} for more information.
 */
export interface FetchOpts<T, A> {
  id?(a: A, state?: T): any;

  run(a: A, state?: T): Observable<Action> | Action | void;

  onError?(a: A, e: any): Observable<any> | any;
}

export type ActionOrActionWithState<T, A> = A | [A, T];
export type ActionStateStream<T, A> = Observable<ActionOrActionWithState<T, A>>;

/**
 * @whatItDoes maps Observable<Action | [Action, State]> to
 * Observable<[Action, State]>
 */
function mapActionAndState<T, A>(): any {
  return (source: Observable<ActionOrActionWithState<T, A>>): Observable<ActionOrActionWithState<T, A>> =>
    source.pipe(
      map((value) => {
        const [action, store] = normalizeActionAndState(value);
        return [action, store] as [A, T];
      })
    );
}

/**
 * @whatItDoes Normalizes either a bare action or an array of action and state
 * into an array of action and state (or undefined)
 */
function normalizeActionAndState<T, A>(args: ActionOrActionWithState<T, A>): [A, T] {
  let action: A;
  let state!: T;

  if (args instanceof Array) {
    [action, state] = args;
  } else {
    action = args;
  }

  return [action, state];
}

function wrapIntoObservable<O>(obj: Observable<O> | O | void): Observable<O> {
  if (isObservable(obj)) {
    return obj;
  } else if (!obj) {
    return of();
  } else {
    return of(obj as O);
  }
}

function runWithErrorHandling<T, A, R>(run: (a: A, state?: T) => Observable<R> | R | void, onError: any): any {
  return ([action, state]: [A, T]): Observable<R> => {
    try {
      const r = wrapIntoObservable(run(action, state));
      return r.pipe(catchError((e) => wrapIntoObservable(onError(action, e))));
    } catch (e) {
      return wrapIntoObservable(onError(action, e));
    }
  };
}

export function fetch<T, A extends Action>(opts: FetchOpts<T, A>) {
  return (source: ActionStateStream<T, A>): Observable<Action> => {
    if (opts.id) {
      const groupedFetches = source.pipe(
        mapActionAndState(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        groupBy(([action, store]) => opts.id(action, store))
      );

      return groupedFetches.pipe(mergeMap((pairs) => pairs.pipe(switchMap(runWithErrorHandling(opts.run, opts.onError)))));
    }

    return source.pipe(mapActionAndState(), concatMap(runWithErrorHandling(opts.run, opts.onError)));
  };
}

@Injectable()
export class DataPersistence<T> {
  constructor(public store: Store<T>, public actions: Actions) {}

  fetch<A extends Action = Action>(actionType: string | ActionCreator, opts: FetchOpts<T, A>): Observable<any> {
    return this.actions.pipe(ofType<A>(actionType), withLatestFrom(this.store), fetch(opts));
  }
}
