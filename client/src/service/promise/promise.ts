/**
 * External Dependencies
 */
import axios from "axios";
import { catchError, from, lastValueFrom, map, tap, throwError } from "rxjs";

const promise = (url: string, api: number = 0) => {
    return lastValueFrom(from(!api ? axios.get(url) : axios.put(url)).pipe(
        tap(res => {
            if (res.status >= 400)
                throw new Error(`StatusCode: ${res.status}`);
        }),
        map(res => res.data),
        catchError((error) => {
            return throwError(() => error);
        }),
    ));
}

export default promise;