import { BehaviorSubject, shareReplay, switchMap } from "rxjs";
import { toDoService, ToDoService } from "../../@api/services/to-do.service";

export class ToDoContextService {

    private readonly _refresh$ = new BehaviorSubject(null);

    public get toDos$() {
        return this._refresh$
        .pipe(
            switchMap(_ => this._toDoService.get()),
            shareReplay(1)
        )
    }

    constructor(
        private readonly _toDoService: ToDoService
    ) { }

    public refresh() {
        this._refresh$.next(null);
    }
}

export const toDoContextService = new ToDoContextService(toDoService);