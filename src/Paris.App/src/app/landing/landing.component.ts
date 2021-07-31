import { html, render } from "lit-html";
import { BehaviorSubject, combineLatest, map, Subject, takeUntil, tap } from "rxjs";
import { StyleInfo, styleMap } from 'lit-html/directives/style-map.js';
import "./landing.component.scss";
import { toDoContextService } from "../@core/services/to-do-context.service";

//https://www.robinwieruch.de/webpack-sass

let styles: StyleInfo = {
    fontFamily: "var(--font-family)",
  };

export class LandingComponent extends HTMLElement {
    private readonly _destroyed$: Subject<void> = new Subject();

    private readonly _attributes$: BehaviorSubject<{
        message?:string
    }> = new BehaviorSubject({ });

    constructor(
        private readonly _toDoContextService = toDoContextService
    ) {
        super();
    }

    private readonly _vm$ = combineLatest([this._attributes$, this._toDoContextService.toDos$]);
    
    static get observedAttributes() {
        return [
            "message"
        ];
    }

    connectedCallback() {    

        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
  
        this._vm$
        .pipe(
            takeUntil(this._destroyed$),
            map(x => html`
            <h1 style=${styleMap(styles)}>Works?</h1>  
            <button part="button">Click</button>          
            `),
            tap(
                template => render(template, this.shadowRoot) 
            )
        ).subscribe();   
    }
    
    attributeChangedCallback (name:any, oldValue:any, newValue:any) {
        let props = {};
        props[name] = newValue;
        this._attributes$.next({ ...props, ...this._attributes$.value })
    }

    disconnectedCallback() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}

window.customElements.define(`ce-landing`,LandingComponent);