import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


export class ToDoService {
    constructor(
        private readonly _baseUrl: string
    ) { }

    public get(): Observable<any> {

        const repsone = fetch(`${this._baseUrl}api/todo`).then(response => response.json());

        return from(repsone);
    }
}


export const toDoService = new ToDoService(environment.baseUrl);