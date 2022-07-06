/**
 * External Dependencies
 */
import { DependencyList, useEffect, useRef } from 'react';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';

/**
 * @desc custom handling of the event
 * @param ref React.MutableRefObject<Element>
 * @param eventName string
 * @param action$ (event$: Observable<Event>) => Observable<Event>
 */
const useFromEvent = (
	ref: React.MutableRefObject<Element>,
	eventName: string,
	action$: (event$: Observable<Event>) => Observable<Event>,
	{ deps }: { deps: DependencyList } = { deps: [] }
) => {
	const action = useRef(action$);

	useEffect(() => {
		let subscription: Subscription | null = new Subscription();
		let subject: Subject<Event> | null = null;

		if (ref.current) {
			subject = new Subject<Event>();

			// excute the action after event
			subscription.add(
				action.current(subject.asObservable()).subscribe()
			);

			// excute the event
			subscription.add(
				fromEvent(ref.current, eventName).subscribe(subject)
			);
		}

		return () => {
			subscription?.unsubscribe();
			subscription = null;
			subject = null;
		};
	}, [eventName, ref, ...deps]);
};

export default useFromEvent;